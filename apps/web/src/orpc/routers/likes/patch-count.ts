import { ORPCError } from '@orpc/client'
import { eq, likesSessions, posts, sql } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'
import { getIp } from '@/utils/get-ip'
import { getSessionId } from '@/utils/get-session-id'

export const patchCount = publicProcedure
  .input(z.object({ slug: z.string().min(1), value: z.number().int().positive().min(1).max(3) }))
  .handler(async ({ input, context }) => {
    const ip = getIp(context.headers)
    const sessionId = getSessionId(input.slug, ip)

    const session = await context.db
      .select({
        likes: likesSessions.likes
      })
      .from(likesSessions)
      .where(eq(likesSessions.id, getSessionId(input.slug, ip)))

    if (session[0] && session[0].likes + input.value > 3) {
      throw new ORPCError('BAD_REQUEST', {
        message: 'You can only like a post 3 times'
      })
    }

    const likes = await context.db
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

    const currentUserLikes = await context.db
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
