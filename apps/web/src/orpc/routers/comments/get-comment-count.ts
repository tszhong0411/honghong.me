import { and, comments, count, eq, isNull } from '@tszhong0411/db'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getCommentCount = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .handler(async ({ input, context }) => {
    const value = await context.db
      .select({
        value: count()
      })
      .from(comments)
      .where(and(eq(comments.postId, input.slug), isNull(comments.parentId)))

    return {
      comments: value[0]?.value ?? 0
    }
  })
