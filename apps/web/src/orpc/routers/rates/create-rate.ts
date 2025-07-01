import { and, eq, rates } from '@tszhong0411/db'
import { z } from 'zod'

import { protectedProcedure } from '@/orpc/root'

export const createRate = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      like: z.boolean().nullable()
    })
  )
  .handler(async ({ input, context }) => {
    const user = context.session.user

    if (input.like === null) {
      await context.db
        .delete(rates)
        .where(and(eq(rates.commentId, input.id), eq(rates.userId, user.id)))

      return
    }

    await context.db
      .insert(rates)
      .values({
        commentId: input.id,
        userId: user.id,
        like: input.like
      })
      .onConflictDoUpdate({
        target: [rates.userId, rates.commentId],
        set: {
          like: input.like
        }
      })
  })
