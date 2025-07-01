import { z } from 'zod'

export const wakatimeStatsSchema = z.object({
  seconds: z.number()
})
