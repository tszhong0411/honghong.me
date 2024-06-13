import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { and, desc, eq, guestbook } from '@tszhong0411/db'
import { env, flags } from '@tszhong0411/env'
import { z } from 'zod'

import { getDefaultUser } from '@/utils/get-default-user'

import type { RouterOutputs } from '../react'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

export const guestbookRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const query = await ctx.db.query.guestbook.findMany({
      with: {
        user: {
          columns: {
            name: true,
            image: true,
            id: true
          }
        }
      },
      orderBy: [desc(guestbook.updatedAt)]
    })

    return query.map((message) => {
      const { defaultImage, defaultName } = getDefaultUser(message.user.id)

      return {
        ...message,
        user: {
          ...message.user,
          name: message.user.name ?? defaultName,
          image: message.user.image ?? defaultImage
        }
      }
    })
  }),
  create: protectedProcedure
    .input(
      z.object({
        message: z.string().min(1, {
          message: 'Message is required'
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user

      await ctx.db.insert(guestbook).values({
        id: createId(),
        body: input.message,
        userId: user.id
      })

      if (flags.guestbookNotification) {
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
                url: 'https://honghong.me/guestbook',
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
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user

      const message = await ctx.db.query.guestbook.findFirst({
        where: and(eq(guestbook.id, input.id), eq(guestbook.userId, user.id))
      })

      if (!message) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Message not found'
        })
      }

      await ctx.db.delete(guestbook).where(eq(guestbook.id, input.id))
    })
})

export type GuestbookOutput = RouterOutputs['guestbook']['get']
