import { likesSessions, posts, sum } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getTotalCount = publicProcedure
  .output(
    z.object({
      likes: z.number()
    })
  )
  .handler(async ({ context }) => {
    const cachedLikeCount = await redis.get<number>(redisKeys.postLikeCount)

    if (cachedLikeCount) {
      return {
        likes: cachedLikeCount
      }
    }

    const result = await context.db
      .select({
        value: sum(likesSessions.likes)
      })
      .from(posts)

    const likes = result[0]?.value ? Number(result[0].value) : 0

    await redis.set(redisKeys.postLikeCount, likes)

    return {
      likes
    }
  })
