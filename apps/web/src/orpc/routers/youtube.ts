import { env } from '@tszhong0411/env'

import { publicProcedure } from '../root'
import { youtubeStatsSchema } from '../schemas/youtube'

export const youtubeStats = publicProcedure
  .route({
    method: 'GET',
    path: '/stats/youtube',
    summary: 'Get YouTube stats',
    tags: ['YouTube']
  })
  .output(youtubeStatsSchema)
  .handler(async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?id=UC2hMWOaOlk9vrkvFVaGmn0Q&part=statistics&key=${env.GOOGLE_API_KEY}`
    )
    const data = await res.json()

    const channel = data.items[0]
    const statistics = channel.statistics

    return {
      subscribers: Number(statistics.subscriberCount),
      views: Number(statistics.viewCount)
    }
  })
