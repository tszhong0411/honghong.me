import { createId } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'
import { and, desc, eq, guestbook, lt } from '@tszhong0411/db'
import { env, flags } from '@tszhong0411/env'
import { ratelimit } from '@tszhong0411/kv'
import { z } from 'zod'

import { isProduction } from '@/lib/constants'
import { getDefaultUser } from '@/utils/get-default-user'
import { getIp } from '@/utils/get-ip'

import type { RouterOutputs } from '../react'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'

const getKey = (id: string) => `guestbook:${id}`

export const guestbookRouter = createTRPCRouter({
  getInfiniteMessages: publicProcedure
    .input(
      z.object({
        cursor: z.date().nullish(),
        limit: z.number().min(1).max(50).default(10)
      })
    )
    .query(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)

      const { success } = await ratelimit.limit(getKey(`get:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const query = await ctx.db.query.guestbook.findMany({
        where: and(input.cursor ? lt(guestbook.createdAt, input.cursor) : undefined),
        limit: input.limit,
        with: {
          user: {
            columns: {
              name: true,
              image: true,
              id: true
            }
          }
        },
        orderBy: desc(guestbook.updatedAt)
      })

      const result = query.map((message) => {
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

      return {
        messages: result,
        nextCursor: result.at(-1)?.updatedAt ?? null
      }
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

      const { success } = await ratelimit.limit(getKey(`create:${user.id}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      await ctx.db.insert(guestbook).values({
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

      const { success } = await ratelimit.limit(getKey(`delete:${user.id}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

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

export type GuestbookOutput = RouterOutputs['guestbook']['getInfiniteMessages']
