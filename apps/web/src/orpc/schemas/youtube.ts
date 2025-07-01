import { z } from 'zod'

export const youtubeStatsSchema = z.object({
  subscribers: z.number(),
  views: z.number()
})
