import { posts, sum } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getTotalCount = publicProcedure
  .output(
    z.object({
      views: z.number()
    })
  )
  .handler(async ({ context }) => {
    const cachedViewCount = await redis.get<number>(redisKeys.postViewCount)

    if (cachedViewCount) {
      return {
        views: cachedViewCount
      }
    }

    const result = await context.db
      .select({
        value: sum(posts.views)
      })
      .from(posts)

    const value = result[0]?.value ? Number(result[0].value) : 0

    await redis.set(redisKeys.postViewCount, value)

    return {
      views: value
    }
  })
