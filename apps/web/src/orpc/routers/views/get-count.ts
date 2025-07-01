import { ORPCError } from '@orpc/client'
import { eq, posts } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getCount = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .output(
    z.object({
      views: z.number()
    })
  )
  .handler(async ({ input, context }) => {
    const cachedViews = await redis.get<number>(redisKeys.postViews(input.slug))

    if (cachedViews) {
      return {
        views: cachedViews
      }
    }

    const post = await context.db
      .select({ views: posts.views })
      .from(posts)
      .where(eq(posts.slug, input.slug))

    if (!post[0]) {
      throw new ORPCError('NOT_FOUND', {
        message: 'Post not found'
      })
    }

    await redis.set(redisKeys.postViews(input.slug), post[0].views)

    return {
      views: post[0].views
    }
  })
