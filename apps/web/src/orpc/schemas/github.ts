import { z } from 'zod'

export const githubStatsSchema = z.object({
  stars: z.number(),
  followers: z.number(),
  repoStars: z.number()
})
