import { z } from 'zod'

export const infiniteQuerySchema = z.object({
  cursor: z.date().nullish(),
  limit: z.number().min(1).max(50).default(10)
})

export const emptyOutputSchema = z.undefined()
