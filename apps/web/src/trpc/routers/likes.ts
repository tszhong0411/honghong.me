import { TRPCError } from '@trpc/server'
import { eq, likesSessions, posts, sql, sum } from '@tszhong0411/db'
import { env } from '@tszhong0411/env'
import { ratelimit, redis, redisKeys } from '@tszhong0411/kv'
import { sha512 } from 'js-sha512'
import { z } from 'zod'

import { getIp } from '@/utils/get-ip'

import { createTRPCRouter, publicProcedure } from '../trpc'

const getSessionId = (slug: string, ip: string): string => {
  const currentUserId = sha512(ip + env.IP_ADDRESS_SALT)

  return `${slug}___${currentUserId}`
}

const getKey = (id: string) => `likes:${id}`

export const likesRouter = createTRPCRouter({
  getCount: publicProcedure.query(async ({ ctx }) => {
    const ip = getIp(ctx.headers)

    const { success } = await ratelimit.limit(getKey(`getCount:${ip}`))

    if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

    const cachedLikeCount = await redis.get<number>(redisKeys.postLikeCount)

    if (cachedLikeCount) {
      return {
        likes: cachedLikeCount
      }
    }

    const result = await ctx.db
      .select({
        value: sum(likesSessions.likes)
      })
      .from(posts)

    const likes = result[0]?.value ? Number(result[0].value) : 0

    await redis.set(redisKeys.postLikeCount, likes)

    return {
      likes
    }
  }),
  get: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1)
      })
    )
    .query(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)
      const sessionId = getSessionId(input.slug, ip)

      const { success } = await ratelimit.limit(getKey(`get:${sessionId}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const cachedLikes = await redis.get<number>(redisKeys.postLikes(input.slug))
      const cachedCurrentUserLikes = await redis.get<number>(
        redisKeys.currentUserLikes(input.slug, sessionId)
      )

      if (cachedLikes && cachedCurrentUserLikes) {
        return {
          likes: cachedLikes,
          currentUserLikes: cachedCurrentUserLikes
        }
      }

      const [post, user] = await Promise.all([
        ctx.db
          .select({
            likes: posts.likes
          })
          .from(posts)
          .where(eq(posts.slug, input.slug)),
        ctx.db
          .select({
            likes: likesSessions.likes
          })
          .from(likesSessions)
          .where(eq(likesSessions.id, sessionId))
      ])

      await redis.set(redisKeys.postLikes(input.slug), post[0]?.likes ?? 0)
      await redis.set(redisKeys.currentUserLikes(input.slug, sessionId), user[0]?.likes ?? 0)

      return {
        likes: post[0]?.likes ?? 0,
        currentUserLikes: user[0]?.likes ?? 0
      }
    }),
  patch: publicProcedure
    .input(
      z.object({
        slug: z.string().min(1),
        value: z.number().int().positive().min(1).max(3)
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)
      const sessionId = getSessionId(input.slug, ip)

      const { success } = await ratelimit.limit(getKey(`patch:${sessionId}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const session = await ctx.db
        .select({
          likes: likesSessions.likes
        })
        .from(likesSessions)
        .where(eq(likesSessions.id, getSessionId(input.slug, ip)))

      if (session[0] && session[0].likes + input.value > 3) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You can only like a post 3 times'
        })
      }

      const likes = await ctx.db
        .insert(posts)
        .values({
          slug: input.slug,
          likes: input.value
        })
        .onConflictDoUpdate({
          target: posts.slug,
          set: {
            likes: sql<number>`${posts.likes} + ${input.value}`
          }
        })
        .returning()

      const currentUserLikes = await ctx.db
        .insert(likesSessions)
        .values({
          id: sessionId,
          likes: input.value
        })
        .onConflictDoUpdate({
          target: likesSessions.id,
          set: {
            likes: sql<number>`${likesSessions.likes} + ${input.value}`
          }
        })
        .returning()

      await redis.set(redisKeys.postLikes(input.slug), likes[0]?.likes)
      await redis.set(redisKeys.currentUserLikes(input.slug, sessionId), currentUserLikes[0]?.likes)
    })
})
