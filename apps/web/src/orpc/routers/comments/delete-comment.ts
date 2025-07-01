import { ORPCError } from '@orpc/client'
import { and, comments, eq } from '@tszhong0411/db'
import { z } from 'zod'

import { protectedProcedure } from '@/orpc/root'

export const deleteComment = protectedProcedure
  .input(
    z.object({
      id: z.string().min(1)
    })
  )
  .handler(async ({ input, context }) => {
    const email = context.session.user.email

    const comment = await context.db.query.comments.findFirst({
      where: eq(comments.id, input.id),
      with: {
        user: true,
        replies: true,
        parent: true
      }
    })

    if (!comment) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Comment not found'
      })
    }

    // Check if the user is the owner of the comment
    if (comment.user.email !== email) {
      throw new ORPCError('UNAUTHORIZED')
    }

    // If the comment has replies, just mark it as deleted.
    // And keep the replies.
    if (comment.replies.length > 0) {
      await context.db.update(comments).set({ isDeleted: true }).where(eq(comments.id, input.id))

      return
    }

    // Otherwise, delete the comment
    await context.db.delete(comments).where(eq(comments.id, input.id))

    // Case: deleting a reply
    if (comment.parentId) {
      const parentComment = await context.db.query.comments.findFirst({
        where: and(eq(comments.id, comment.parentId), eq(comments.isDeleted, true)),
        with: {
          replies: true
        }
      })

      // If the parent comment (which is marked as deleted) has no replies, delete it also.
      if (parentComment?.replies.length === 0) {
        await context.db.delete(comments).where(eq(comments.id, comment.parentId))
      }
    }
  })
