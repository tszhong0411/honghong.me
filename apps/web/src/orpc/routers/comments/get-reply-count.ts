import { and, comments, count, eq, isNotNull } from '@tszhong0411/db'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getReplyCount = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .output(
    z.object({
      replies: z.number()
    })
  )
  .handler(async ({ input, context }) => {
    const value = await context.db
      .select({
        value: count()
      })
      .from(comments)
      .where(and(eq(comments.postId, input.slug), isNotNull(comments.parentId)))

    return {
      replies: value[0]?.value ?? 0
    }
  })
