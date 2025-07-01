import { env } from '@tszhong0411/env'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getStats = publicProcedure
  .output(
    z.object({
      subscribers: z.number(),
      views: z.number()
    })
  )
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
