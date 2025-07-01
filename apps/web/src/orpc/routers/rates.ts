import { ORPCError } from '@orpc/client'
import { and, eq, rates } from '@tszhong0411/db'

import { protectedProcedure } from '../root'
import { createRateInputSchema, rateSchema } from '../schemas/rates'

export const createRate = protectedProcedure
  .route({
    method: 'POST',
    path: '/rates/{id}',
    summary: 'Create rate',
    tags: ['Rates']
  })
  .input(createRateInputSchema)
  .output(rateSchema)
  .handler(async ({ input, context }) => {
    const user = context.session.user

    if (input.like === null) {
      const [rate] = await context.db
        .delete(rates)
        .where(and(eq(rates.commentId, input.id), eq(rates.userId, user.id)))
        .returning()

      if (!rate) {
        throw new ORPCError('INTERNAL_SERVER_ERROR', {
          message: 'Failed to delete rate'
        })
      }

      return rate
    }

    const [rate] = await context.db
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
      .returning()

    if (!rate) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to create rate'
      })
    }

    return rate
  })
