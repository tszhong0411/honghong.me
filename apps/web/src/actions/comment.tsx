'use server'

import { createId } from '@paralleldrive/cuid2'
import { CommentNotification } from '@tszhong0411/emails'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'
import { z } from 'zod'

import { db } from '@/db'
import { comments, commentUpvotes, users } from '@/db/schema'
import { env } from '@/env'
import { isProduction } from '@/lib/constants'
import { type BlogMetadata, getPage } from '@/lib/mdx'
import { type getComments } from '@/queries/comments'
import { getErrorMessage } from '@/utils/get-error-message'

import { privateAction } from './private-action'

const resend = new Resend(env.RESEND_API_KEY)

export const postComment = (
  slug: string,
  comment: string,
  markdown: string,
  parentId?: string
) =>
  privateAction(async (user) => {
    const schema = z.object({
      comment: z.string().min(1, {
        message: 'Comment is required.'
      }),
      markdown: z.string().min(1, {
        message: 'Comment is required.'
      }),
      slug: z.string().min(1, {
        message: 'Slug is required.'
      }),
      parentId: z.string().optional()
    })

    const parsed = schema.safeParse({
      comment,
      markdown,
      slug,
      parentId
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const {
      comment: parsedComment,
      markdown: parsedMarkdown,
      slug: parsedSlug,
      parentId: parsedParentId
    } = parsed.data

    try {
      const commentId = createId()

      await db.insert(comments).values({
        id: commentId,
        body: parsedComment,
        userId: user.id as string,
        postId: parsedSlug,
        ...(parentId && {
          parentId: parsedParentId
        })
      })

      const {
        metadata: { title }
      } = getPage<BlogMetadata>(`/blog/${slug}`)!

      if (!parentId) {
        await db.insert(commentUpvotes).values({
          id: createId(),
          userId: user.id as string,
          commentId
        })

        if (user.role === 'user' && isProduction) {
          await resend.emails.send({
            from: 'Hong from honghong.me <me@honghong.me>',
            to: env.AUTHOR_EMAIL,
            subject: 'New comment posted',
            react: CommentNotification({
              title,
              name: user.name as string,
              commenterName: user.name as string,
              comment: parsedMarkdown,
              commentUrl: `https://honghong.me/blog/${slug}#comment-${commentId}`,
              postUrl: `https://honghong.me/blog/${slug}`,
              type: 'comment'
            })
          })
        }
      }

      if (parentId) {
        const parentComment = await db
          .select()
          .from(comments)
          .where(eq(comments.id, parentId))
          .innerJoin(users, eq(users.id, comments.userId))

        if (
          parentComment[0] &&
          parentComment[0].user.email !== user.email &&
          isProduction
        ) {
          await resend.emails.send({
            from: 'Hong from honghong.me <me@honghong.me>',
            to: parentComment[0].user.email,
            subject: 'New reply posted',
            react: CommentNotification({
              title,
              name: user.name as string,
              commenterName: user.name as string,
              comment: parsedMarkdown,
              commentUrl: `https://honghong.me/blog/${slug}#comment-${commentId}`,
              postUrl: `https://honghong.me/blog/${slug}`,
              type: 'reply'
            })
          })
        }
      }
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/blog/[slug]', 'page')
    return {
      message: 'Posted a comment.'
    }
  })

export const deleteComment = (id: string) =>
  privateAction(async (user) => {
    const schema = z.object({
      id: z.string().min(1, {
        message: 'ID is required.'
      })
    })

    const parsed = schema.safeParse({
      id
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const { id: parsedId } = parsed.data

    const email = user.email

    const comment = await db.query.comments.findFirst({
      where: eq(comments.id, parsedId),
      with: {
        user: true,
        replies: true,
        parent: true
      }
    })

    if (!comment) {
      return {
        message: 'Comment not found',
        error: true
      }
    }

    if (comment.user.email !== email) {
      return {
        message: 'Unauthorized',
        error: true
      }
    }

    try {
      // If the comment has replies, just mark it as deleted.
      if (comment.replies.length > 0) {
        await db
          .update(comments)
          .set({
            body: '[This comment has been deleted]',
            isDeleted: true
          })
          .where(eq(comments.id, parsedId))
      } else {
        await db.delete(comments).where(eq(comments.id, parsedId))

        if (comment.parentId) {
          const parentComment = await db.query.comments.findFirst({
            where: and(
              eq(comments.id, comment.parentId),
              eq(comments.isDeleted, true)
            ),
            with: {
              replies: true
            }
          })

          // If the parent comment (which is marked as deleted) has no replies, delete it also.
          if (parentComment?.replies.length === 0) {
            await db.delete(comments).where(eq(comments.id, comment.parentId))
          }
        }
      }
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/blog/[slug]', 'page')
    return {
      message: 'Deleted a comment.'
    }
  })

export const upvoteComment = (id: string) =>
  privateAction(async (user) => {
    const schema = z.object({
      id: z.string().min(1, {
        message: 'ID is required.'
      })
    })

    const parsed = schema.safeParse({
      id
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const { id: parsedId } = parsed.data

    const comment = await db.query.comments.findFirst({
      where: eq(comments.id, parsedId),
      with: {
        upvotes: {
          where: eq(commentUpvotes.userId, user.id as string)
        }
      }
    })

    if (!comment) {
      return {
        message: 'Comment not found',
        error: true
      }
    }

    if (comment.upvotes.length > 0) {
      await db
        .delete(commentUpvotes)
        .where(eq(commentUpvotes.id, comment.upvotes[0]!.id))

      revalidatePath('/blog/[slug]', 'page')
      return {
        message: 'Removed an upvote.'
      }
    }

    try {
      await db.insert(commentUpvotes).values({
        id: createId(),
        userId: user.id as string,
        commentId: parsedId
      })
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/blog/[slug]', 'page')
    return {
      message: 'Upvoted a comment.'
    }
  })

export type Comment = Awaited<ReturnType<typeof getComments>>[0]
export type Reply = typeof comments.$inferSelect & {
  user: typeof users.$inferSelect
}
