import { TRPCError } from '@trpc/server'
import { eq, posts, sql, sum } from '@tszhong0411/db'
import { ratelimit, redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { getIp } from '@/utils/get-ip'

import { createTRPCRouter, publicProcedure } from '../trpc'

const getKey = (id: string) => `views:${id}`

export const viewsRouter = createTRPCRouter({
  getCount: publicProcedure.query(async ({ ctx }) => {
    const ip = getIp(ctx.headers)

    const { success } = await ratelimit.limit(getKey(`getCount:${ip}`))

    if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

    const cachedViewCount = await redis.get<number>(redisKeys.postViewCount)

    if (cachedViewCount) {
      return {
        views: cachedViewCount
      }
    }

    const result = await ctx.db
      .select({
        value: sum(posts.views)
      })
      .from(posts)

    const value = result[0]?.value ? Number(result[0].value) : 0

    await redis.set(redisKeys.postViewCount, value)

    return {
      views: value
    }
  }),
  get: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const ip = getIp(ctx.headers)

      const { success } = await ratelimit.limit(getKey(`get:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const cachedViews = await redis.get<number>(redisKeys.postViews(input.slug))

      if (cachedViews) {
        return {
          views: cachedViews
        }
      }

      const post = await ctx.db
        .select({ views: posts.views })
        .from(posts)
        .where(eq(posts.slug, input.slug))

      if (!post[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found'
        })
      }

      await redis.set(redisKeys.postViews(input.slug), post[0].views)

      return {
        views: post[0].views
      }
    }),
  increment: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.headers.get('x-forwarded-for') ?? '0.0.0.0'

      const { success } = await ratelimit.limit(getKey(`increment:${ip}`))

      if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })

      const views = await ctx.db
        .insert(posts)
        .values({
          slug: input.slug,
          views: 1
        })
        .onConflictDoUpdate({
          target: posts.slug,
          set: {
            views: sql<number>`${posts.views} + 1`
          }
        })
        .returning()

      await redis.set(redisKeys.postViews(input.slug), views[0]?.views)
    })
})
