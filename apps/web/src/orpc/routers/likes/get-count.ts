import { eq, likesSessions, posts } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'
import { getIp } from '@/utils/get-ip'
import { getSessionId } from '@/utils/get-session-id'

export const getCount = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .output(
    z.object({
      likes: z.number(),
      currentUserLikes: z.number()
    })
  )
  .handler(async ({ input, context }) => {
    const ip = getIp(context.headers)
    const sessionId = getSessionId(input.slug, ip)

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
      context.db
        .select({
          likes: posts.likes
        })
        .from(posts)
        .where(eq(posts.slug, input.slug)),
      context.db
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
  })
