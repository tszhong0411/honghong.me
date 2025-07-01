import { z } from 'zod'

export const viewSchema = z.object({
  views: z.number()
})

export const getViewInputSchema = z.object({
  slug: z.string()
})

export const incrementViewInputSchema = z.object({
  slug: z.string()
})
