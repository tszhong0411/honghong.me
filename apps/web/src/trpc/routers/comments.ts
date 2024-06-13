import { createId } from '@paralleldrive/cuid2'
import type { JSONContent } from '@tiptap/core'
import { Bold } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { Italic } from '@tiptap/extension-italic'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Strike } from '@tiptap/extension-strike'
import { Text } from '@tiptap/extension-text'
import { generateHTML } from '@tiptap/html'
import { TRPCError } from '@trpc/server'
import { and, asc, comments, count, desc, eq, isNull, rates } from '@tszhong0411/db'
import { CommentNotification } from '@tszhong0411/emails'
import { env } from '@tszhong0411/env'
import { allBlogPosts } from 'mdx/generated'
import { Resend } from 'resend'
import { z } from 'zod'

import { isProduction } from '@/lib/constants'
import { getDefaultUser } from '@/utils/get-default-user'

import type { RouterOutputs } from '../react'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const resend = new Resend(env.RESEND_API_KEY)

const baseJSONContent = z.object({
  type: z.string().optional(),
  attrs: z.record(z.any()).optional(),
  marks: z
    .array(
      z.object({
        type: z.string(),
        attrs: z.record(z.any()).optional()
      })
    )
    .optional(),
  text: z.string().optional()
})

const JSONContentSchema: z.ZodType<z.infer<typeof baseJSONContent>> = baseJSONContent.extend({
  content: z.array(z.lazy(() => JSONContentSchema)).optional()
})

export const commentsRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        parentId: z.string().optional(),
        sort: z.enum(['newest', 'oldest']).optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const session = ctx.session

      const query = await ctx.db.query.comments.findMany({
        where: and(
          eq(comments.postId, input.slug),
          input.parentId ? eq(comments.parentId, input.parentId) : isNull(comments.parentId)
        ),
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
        orderBy: input.sort === 'newest' ? [desc(comments.createdAt)] : [asc(comments.createdAt)],
        columns: {
          id: true,
          userId: true,
          parentId: true,
          body: true,
          createdAt: true,
          isDeleted: true
        }
      })

      return await Promise.all(
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
            body: comment.body as JSONContent,
            replies: replies[0]?.value ?? 0,
            likes: likes[0]?.value ?? 0,
            dislikes: dislikes[0]?.value ?? 0,
            liked: selfRate?.like ?? undefined,
            user: {
              ...comment.user,
              image: comment.user.image ?? defaultImage,
              name: comment.user.name ?? defaultName
            }
          }
        })
      )
    }),
  getCount: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const value = await ctx.db
        .select({
          value: count()
        })
        .from(comments)
        .where(eq(comments.postId, input.slug))

      return {
        value: value[0]?.value ?? 0
      }
    }),
  post: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        content: JSONContentSchema,
        parentId: z.string().optional()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user
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
            comment: generateHTML(input.content, [Bold, Document, Italic, Paragraph, Strike, Text]),
            commenter: {
              name: user.name ?? defaultName,
              image: user.image ?? defaultImage
            },
            commentIdentifier:
              type === 'comment'
                ? `comment-${commentId}`
                : `comment-${input.parentId}-${commentId}`,
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
        await ctx.db
          .update(comments)
          .set({
            body: null,
            isDeleted: true
          })
          .where(eq(comments.id, input.id))

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

export type CommentsOutput = RouterOutputs['comments']['get']
