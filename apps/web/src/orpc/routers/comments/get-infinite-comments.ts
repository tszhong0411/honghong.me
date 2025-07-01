import {
  and,
  asc,
  comments,
  desc,
  eq,
  gt,
  isNotNull,
  isNull,
  lt,
  ne,
  rates,
  users
} from '@tszhong0411/db'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'
import { getDefaultImage } from '@/utils/get-default-image'

export const getInfiniteComments = publicProcedure
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
  .output(
    z.object({
      comments: z.array(
        createSelectSchema(comments)
          .pick({
            id: true,
            userId: true,
            parentId: true,
            body: true,
            createdAt: true,
            isDeleted: true,
            replyCount: true,
            likeCount: true,
            dislikeCount: true
          })
          .extend({
            user: createSelectSchema(users).pick({
              id: true,
              name: true,
              image: true,
              role: true
            }),
            liked: z.boolean().nullable()
          })
      ),
      nextCursor: z.date().nullable()
    })
  )
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
      orderBy: input.sort === 'newest' ? desc(comments.createdAt) : asc(comments.createdAt),
      columns: {
        id: true,
        userId: true,
        parentId: true,
        body: true,
        createdAt: true,
        isDeleted: true,
        replyCount: true,
        likeCount: true,
        dislikeCount: true
      }
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
        },
        columns: {
          id: true,
          userId: true,
          parentId: true,
          body: true,
          createdAt: true,
          isDeleted: true,
          replyCount: true,
          likeCount: true,
          dislikeCount: true
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
