import { rates } from '@tszhong0411/db'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createRateInputSchema = z.object({
  id: z.string(),
  like: z.boolean().nullable()
})

export const rateSchema = createSelectSchema(rates)
