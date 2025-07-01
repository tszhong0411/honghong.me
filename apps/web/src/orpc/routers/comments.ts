import { ORPCError } from '@orpc/client'
import { createId } from '@paralleldrive/cuid2'
import {
  and,
  asc,
  comments,
  count,
  desc,
  eq,
  gt,
  isNotNull,
  isNull,
  lt,
  ne,
  rates
} from '@tszhong0411/db'
import { CommentEmailTemplate, ReplyEmailTemplate } from '@tszhong0411/emails'
import { env } from '@tszhong0411/env'
import { allPosts } from 'content-collections'

import { isProduction } from '@/lib/constants'
import { resend } from '@/lib/resend'
import { getDefaultImage } from '@/utils/get-default-image'

import { protectedProcedure, publicProcedure } from '../root'
import {
  commentSchema,
  commentsSchema,
  countCommentsInputSchema,
  countCommentsSchema,
  createCommentInputSchema,
  deleteCommentInputSchema,
  listCommentsInputSchema
} from '../schemas/comments'
import { emptyOutputSchema } from '../schemas/common'

export const listComments = publicProcedure
  .route({
    method: 'GET',
    path: '/posts/{slug}/comments',
    summary: 'List comments',
    tags: ['Comments']
  })
  .input(listCommentsInputSchema)
  .output(commentsSchema)
  .handler(async ({ input, context }) => {
    const session = context.session

    const getCursorFilter = () => {
      if (!input.cursor) return
      return input.sort === 'newest'
        ? lt(comments.createdAt, input.cursor)
        : gt(comments.createdAt, input.cursor)
    }

    const query = await context.db.query.comments.findMany({
      where: and(
        eq(comments.postId, input.slug),
        input.parentId ? eq(comments.parentId, input.parentId) : isNull(comments.parentId),
        input.type === 'comments' ? isNull(comments.parentId) : isNotNull(comments.parentId),
        getCursorFilter(),
        input.highlightedCommentId ? ne(comments.id, input.highlightedCommentId) : undefined
      ),
      limit: input.limit,
      with: {
        user: {
          columns: {
            name: true,
            image: true,
            role: true,
            id: true
          }
        },
        rates: {
          where: eq(rates.userId, session?.user.id ?? '')
        }
      },
      orderBy: input.sort === 'newest' ? desc(comments.createdAt) : asc(comments.createdAt)
    })

    if (input.highlightedCommentId && !input.cursor) {
      const highlightedComment = await context.db.query.comments.findFirst({
        where: eq(comments.id, input.highlightedCommentId),
        with: {
          user: {
            columns: {
              name: true,
              image: true,
              role: true,
              id: true
            }
          },
          rates: {
            where: eq(rates.userId, session?.user.id ?? '')
          }
        }
      })

      if (highlightedComment) query.unshift(highlightedComment)
    }

    const result = query.map((comment) => {
      const selfRate = comment.rates.length > 0 ? comment.rates[0] : null
      const defaultImage = getDefaultImage(comment.user.id)

      return {
        ...comment,
        liked: selfRate?.like ?? null,
        user: {
          ...comment.user,
          image: comment.user.image ?? defaultImage,
          name: comment.user.name
        }
      }
    })

    return {
      comments: result,
      nextCursor: result.at(-1)?.createdAt ?? null
    }
  })

export const createComment = protectedProcedure
  .route({
    method: 'POST',
    path: '/posts/{slug}/comments',
    summary: 'Create a comment',
    tags: ['Comments']
  })
  .input(createCommentInputSchema)
  .output(commentSchema)
  .handler(async ({ input, context }) => {
    const user = context.session.user

    const commentId = createId()

    const page = allPosts.find((post) => post.slug === input.slug)

    if (!page) throw new ORPCError('NOT_FOUND', { message: 'Blog post not found' })

    const title = page.title
    const defaultImage = getDefaultImage(user.id)

    const userProfile = {
      name: user.name,
      image: user.image ?? defaultImage
    }

    const post = {
      title,
      url: `https://nelsonlai.me/blog/${input.slug}`
    }

    const comment = await context.db.transaction(async (tx) => {
      const [c] = await tx
        .insert(comments)
        .values({
          id: commentId,
          body: input.content,
          userId: user.id,
          postId: input.slug,
          parentId: input.parentId
        })
        .returning()

      if (!c) {
        throw new ORPCError('INTERNAL_SERVER_ERROR', {
          message: 'Failed to create comment'
        })
      }

      if (isProduction && resend !== null) {
        // Notify the author of the blog post via email
        if (!input.parentId && user.role === 'user') {
          await resend.emails.send({
            from: 'Nelson Lai <me@nelsonlai.me>',
            to: env.AUTHOR_EMAIL,
            subject: 'New comment on your blog post',
            react: CommentEmailTemplate({
              comment: input.content,
              commenter: userProfile,
              id: `comment=${commentId}`,
              date: input.date,
              post
            })
          })
        }

        // Notify the parent comment owner via email
        if (input.parentId) {
          const parentComment = await tx.query.comments.findFirst({
            where: eq(comments.id, input.parentId),
            with: {
              user: true
            }
          })

          if (parentComment && parentComment.user.email !== user.email) {
            await resend.emails.send({
              from: 'Nelson Lai <me@nelsonlai.me>',
              to: parentComment.user.email,
              subject: 'New reply to your comment',
              react: ReplyEmailTemplate({
                reply: input.content,
                replier: userProfile,
                comment: parentComment.body,
                id: `comment=${input.parentId}&reply=${commentId}`,
                date: input.date,
                post
              })
            })
          }
        }
      }

      return c
    })

    return comment
  })

export const deleteComment = protectedProcedure
  .route({
    method: 'DELETE',
    path: '/comments/{id}',
    summary: 'Delete a comment',
    tags: ['Comments']
  })
  .input(deleteCommentInputSchema)
  .output(emptyOutputSchema)
  .handler(async ({ input, context }) => {
    const email = context.session.user.email

    const comment = await context.db.query.comments.findFirst({
      where: eq(comments.id, input.id),
      with: {
        user: true,
        replies: true,
        parent: true
      }
    })

    if (!comment) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Comment not found'
      })
    }

    // Check if the user is the owner of the comment
    if (comment.user.email !== email) {
      throw new ORPCError('UNAUTHORIZED')
    }

    // If the comment has replies, just mark it as deleted.
    // And keep the replies.
    if (comment.replies.length > 0) {
      await context.db.update(comments).set({ isDeleted: true }).where(eq(comments.id, input.id))

      return
    }

    // Otherwise, delete the comment
    await context.db.delete(comments).where(eq(comments.id, input.id))

    // Case: deleting a reply
    if (comment.parentId) {
      const parentComment = await context.db.query.comments.findFirst({
        where: and(eq(comments.id, comment.parentId), eq(comments.isDeleted, true)),
        with: {
          replies: true
        }
      })

      // If the parent comment (which is marked as deleted) has no replies, delete it also.
      if (parentComment?.replies.length === 0) {
        await context.db.delete(comments).where(eq(comments.id, comment.parentId))
      }
    }
  })

export const countComments = publicProcedure
  .route({
    method: 'GET',
    path: '/posts/{slug}/comments/count',
    summary: 'Count comments',
    tags: ['Comments']
  })
  .input(countCommentsInputSchema)
  .output(countCommentsSchema)
  .handler(async ({ input, context }) => {
    const [result] = await context.db
      .select({
        value: count()
      })
      .from(comments)
      .where(
        and(
          eq(comments.postId, input.slug),
          input.withReplies ? undefined : isNull(comments.parentId)
        )
      )

    return {
      count: result?.value ?? 0
    }
  })
