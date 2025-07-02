import { ORPCError } from '@orpc/client'
import { and, eq, votes } from '@tszhong0411/db'

import { protectedProcedure } from '../root'
import { createVoteInputSchema, voteSchema } from '../schemas/votes'

export const createVote = protectedProcedure
  .route({
    method: 'POST',
    path: '/votes/{id}',
    summary: 'Create vote',
    tags: ['Votes']
  })
  .input(createVoteInputSchema)
  .output(voteSchema)
  .handler(async ({ input, context }) => {
    const user = context.session.user

    if (input.like === null) {
      const [vote] = await context.db
        .delete(votes)
        .where(and(eq(votes.commentId, input.id), eq(votes.userId, user.id)))
        .returning()

      if (!vote) {
        throw new ORPCError('INTERNAL_SERVER_ERROR', {
          message: 'Failed to delete vote'
        })
      }

      return vote
    }

    const [vote] = await context.db
      .insert(votes)
      .values({
        commentId: input.id,
        userId: user.id,
        like: input.like
      })
      .onConflictDoUpdate({
        target: [votes.userId, votes.commentId],
        set: {
          like: input.like
        }
      })
      .returning()

    if (!vote) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to create vote'
      })
    }

    return vote
  })
