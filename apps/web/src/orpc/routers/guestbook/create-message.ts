import { createId } from '@paralleldrive/cuid2'
import { guestbook } from '@tszhong0411/db'
import { env, flags } from '@tszhong0411/env'
import { z } from 'zod'

import { isProduction } from '@/lib/constants'
import { protectedProcedure } from '@/orpc/root'

export const createMessage = protectedProcedure
  .input(
    z.object({
      message: z.string().min(1, {
        message: 'Message is required'
      })
    })
  )
  .handler(async ({ input, context }) => {
    const user = context.session.user

    await context.db.insert(guestbook).values({
      id: createId(),
      body: input.message,
      userId: user.id
    })

    if (flags.guestbookNotification && isProduction) {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: null,
          embeds: [
            {
              title: 'New comment!',
              description: input.message,
              url: 'https://nelsonlai.me/guestbook',
              color: '6609519',
              author: {
                name: user.name,
                icon_url: user.image
              },
              timestamp: new Date().toISOString()
            }
          ],
          username: 'Blog',
          avatar_url:
            'https://cdn.discordapp.com/avatars/1123845082672537751/8af603a10f1d2f86ebc922ede339cd3a.webp',
          attachments: []
        })
      })
    }
  })
