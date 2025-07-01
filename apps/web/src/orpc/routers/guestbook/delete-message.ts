import { ORPCError } from '@orpc/client'
import { and, eq, guestbook } from '@tszhong0411/db'
import { z } from 'zod'

import { protectedProcedure } from '@/orpc/root'

export const deleteMessage = protectedProcedure
  .input(
    z.object({
      id: z.string().min(1)
    })
  )
  .handler(async ({ input, context }) => {
    const user = context.session.user

    const message = await context.db.query.guestbook.findFirst({
      where: and(eq(guestbook.id, input.id), eq(guestbook.userId, user.id))
    })

    if (!message) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Message not found'
      })
    }

    await context.db.delete(guestbook).where(eq(guestbook.id, input.id))
  })
