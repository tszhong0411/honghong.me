import { z } from 'zod'

export const viewsStatsSchema = z.object({
  views: z.number()
})

export const likesStatsSchema = z.object({
  likes: z.number()
})
