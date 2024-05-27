import { and, eq, rates } from '@tszhong0411/db'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const ratesRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = ctx.session.user

      await ctx.db
        .delete(rates)
        .where(and(eq(rates.commentId, input.id), eq(rates.userId, user.id)))
    }),
  set: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        like: z.boolean()
      })
    )
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const user = ctx.session.user

      await ctx.db
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
})
