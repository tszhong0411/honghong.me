import { posts, sql } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const increment = publicProcedure
  .input(z.object({ slug: z.string().min(1) }))
  .handler(async ({ input, context }) => {
    const views = await context.db
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
