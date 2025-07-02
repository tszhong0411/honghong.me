import { votes } from '@tszhong0411/db'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createVoteInputSchema = z.object({
  id: z.string(),
  like: z.boolean().nullable()
})

export const voteSchema = createSelectSchema(votes)
