import { likesSessions, posts, sum } from '@tszhong0411/db'

import { publicProcedure } from '../root'
import { likesStatsSchema, viewsStatsSchema } from '../schemas/blog'

export const viewsStats = publicProcedure
  .route({
    method: 'GET',
    path: '/stats/blog/views',
    summary: 'Get views stats',
    tags: ['Blog']
  })
  .output(viewsStatsSchema)
  .handler(async ({ context }) => {
    const result = await context.db
      .select({
        value: sum(posts.views)
      })
      .from(posts)

    const value = result[0]?.value ? Number(result[0].value) : 0

    return {
      views: value
    }
  })

export const likesStats = publicProcedure
  .route({
    method: 'GET',
    path: '/stats/blog/likes',
    summary: 'Get likes stats',
    tags: ['Blog']
  })
  .output(likesStatsSchema)
  .handler(async ({ context }) => {
    const result = await context.db
      .select({
        value: sum(likesSessions.likes)
      })
      .from(posts)

    const likes = result[0]?.value ? Number(result[0].value) : 0

    return {
      likes
    }
  })
