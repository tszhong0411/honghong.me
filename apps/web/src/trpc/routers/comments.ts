import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
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
import { CommentNotification } from '@tszhong0411/emails'
import { env } from '@tszhong0411/env'
import { ratelimit } from '@tszhong0411/kv'
import { allBlogPosts } from 'mdx/generated'
import { Resend } from 'resend'
import { z } from 'zod'

import { isProduction } from '@/lib/constants'
import { getDefaultUser } from '@/utils/get-default-user'
import { getIp } from '@/utils/get-ip'

import type { RouterInputs, RouterOutputs } from '../react'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const resend = new Resend(env.RESEND_API_KEY)

const getKey = (id: string) => `comments:${id}`

export const commentsRouter = createTRPCRouter({
  getInfiniteComments: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        parentId: z.string().optional(),
        sort: z.enum(['newest', 'oldest']).default('newest'),
        cursor: z.date().nullish(),
        limit: z.number().min(1).max(50).default(10),
        type: z.enum(['comments', 'replies']).default('comments'),
        highlightedCommentId: z.string().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const session = ctx.session

      const ip = getIp(ctx.headers)

      const { success } = await ratelimit.limit(getKey(`getInfiniteComments:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const query = await ctx.db.query.comments.findMany({
        where: and(
          eq(comments.postId, input.slug),
          input.parentId ? eq(comments.parentId, input.parentId) : isNull(comments.parentId),
          input.type === 'comments' ? isNull(comments.parentId) : isNotNull(comments.parentId),
          input.cursor
            ? input.sort === 'newest'
              ? lt(comments.createdAt, input.cursor)
              : gt(comments.createdAt, input.cursor)
            : undefined,
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
        orderBy: input.sort === 'newest' ? desc(comments.createdAt) : asc(comments.createdAt),
        columns: {
          id: true,
          userId: true,
          parentId: true,
          body: true,
          createdAt: true,
          isDeleted: true
        }
      })

      if (input.highlightedCommentId && !input.cursor) {
        const highlightedComment = await ctx.db.query.comments.findFirst({
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
          },
          columns: {
            id: true,
            userId: true,
            parentId: true,
            body: true,
            createdAt: true,
            isDeleted: true
          }
        })

        highlightedComment && query.unshift(highlightedComment)
      }

      const result = await Promise.all(
        query.map(async (comment) => {
          const replies = await ctx.db
            .select({
              value: count()
            })
            .from(comments)
            .where(eq(comments.parentId, comment.id))

          const selfRate = comment.rates.length > 0 ? comment.rates[0] : null
          const likes = await ctx.db
            .select({
              value: count()
            })
            .from(rates)
            .where(and(eq(rates.commentId, comment.id), eq(rates.like, true)))
          const dislikes = await ctx.db
            .select({
              value: count()
            })
            .from(rates)
            .where(and(eq(rates.commentId, comment.id), eq(rates.like, false)))

          const { defaultImage, defaultName } = getDefaultUser(comment.user.id)

          return {
            ...comment,
            body: comment.body,
            replies: replies[0]?.value ?? 0,
            likes: likes[0]?.value ?? 0,
            dislikes: dislikes[0]?.value ?? 0,
            liked: selfRate?.like ?? null,
            user: {
              ...comment.user,
              image: comment.user.image ?? defaultImage,
              name: comment.user.name ?? defaultName
            }
          }
        })
      )

      return {
        comments: result,
        nextCursor: result.at(-1)?.createdAt ?? null
      }
    }),
  getTotalCommentsCount: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)

      const { success } = await ratelimit.limit(getKey(`getTotalCommentsCount:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const value = await ctx.db
        .select({
          value: count()
        })
        .from(comments)
        .where(eq(comments.postId, input.slug))

      return {
        comments: value[0]?.value ?? 0
      }
    }),
  getCommentsCount: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)

      const { success } = await ratelimit.limit(getKey(`getCommentsCount:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const value = await ctx.db
        .select({
          value: count()
        })
        .from(comments)
        .where(and(eq(comments.postId, input.slug), isNull(comments.parentId)))

      return {
        comments: value[0]?.value ?? 0
      }
    }),
  getRepliesCount: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)

      const { success } = await ratelimit.limit(getKey(`getRepliesCount:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const value = await ctx.db
        .select({
          value: count()
        })
        .from(comments)
        .where(and(eq(comments.postId, input.slug), isNotNull(comments.parentId)))

      return {
        replies: value[0]?.value ?? 0
      }
    }),
  post: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        content: z.string().min(1),
        parentId: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user

      const { success } = await ratelimit.limit(getKey(`post:${user.id}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const commentId = createId()

      await ctx.db.insert(comments).values({
        id: commentId,
        body: input.content,
        userId: user.id,
        postId: input.slug,
        ...(input.parentId
          ? {
              parentId: input.parentId
            }
          : {})
      })

      const page = allBlogPosts.find((post) => post.slug === input.slug)

      if (!page) return

      const title = page.title
      const { defaultImage, defaultName } = getDefaultUser(user.id)

      const sendNotification = async (type: 'comment' | 'reply', to: string) => {
        if (!isProduction) return
        if (type === 'reply' && !input.parentId) return

        await resend.emails.send({
          from: 'Hong from honghong.me <me@honghong.me>',
          to,
          subject: `New ${type} posted`,
          react: CommentNotification({
            comment: input.content,
            commenter: {
              name: user.name ?? defaultName,
              image: user.image ?? defaultImage
            },
            commentIdentifier:
              type === 'comment'
                ? `comment=${commentId}`
                : `comment=${input.parentId}&reply=${commentId}`,
            date: new Date().toDateString(),
            post: {
              title,
              url: `https://honghong.me/blog/${input.slug}`
            },
            type
          })
        })
      }

      // Notify the author of the blog post via email
      if (!input.parentId && user.role === 'user') {
        await sendNotification('comment', env.AUTHOR_EMAIL)
      }

      // Notify the parent comment owner via email
      if (input.parentId) {
        const parentComment = await ctx.db.query.comments.findFirst({
          where: eq(comments.id, input.parentId),
          with: {
            user: true
          }
        })

        if (parentComment && parentComment.user.email !== user.email) {
          await sendNotification('reply', parentComment.user.email)
        }
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user

      const { success } = await ratelimit.limit(getKey(`delete:${user.id}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const email = ctx.session.user.email

      const comment = await ctx.db.query.comments.findFirst({
        where: eq(comments.id, input.id),
        with: {
          user: true,
          replies: true,
          parent: true
        }
      })

      if (!comment) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Comment not found'
        })
      }

      // Check if the user is the owner of the comment
      if (comment.user.email !== email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED'
        })
      }

      // If the comment has replies, just mark it as deleted.
      // And keep the replies.
      if (comment.replies.length > 0) {
        await ctx.db.update(comments).set({ isDeleted: true }).where(eq(comments.id, input.id))

        return
      }

      // Otherwise, delete the comment
      await ctx.db.delete(comments).where(eq(comments.id, input.id))

      // Case: deleting a reply
      if (comment.parentId) {
        const parentComment = await ctx.db.query.comments.findFirst({
          where: and(eq(comments.id, comment.parentId), eq(comments.isDeleted, true)),
          with: {
            replies: true
          }
        })

        // If the parent comment (which is marked as deleted) has no replies, delete it also.
        if (parentComment?.replies.length === 0) {
          await ctx.db.delete(comments).where(eq(comments.id, comment.parentId))
        }
      }
    })
})

export type CommentsInput = RouterInputs['comments']['getInfiniteComments']
export type CommentsOutput = RouterOutputs['comments']['getInfiniteComments']
