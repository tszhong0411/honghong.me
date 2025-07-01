import { comments, count, eq } from '@tszhong0411/db'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getTotalCommentCount = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .handler(async ({ input, context }) => {
    const value = await context.db
      .select({
        value: count()
      })
      .from(comments)
      .where(eq(comments.postId, input.slug))

    return {
      comments: value[0]?.value ?? 0
    }
  })
