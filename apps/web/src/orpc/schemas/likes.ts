import { z } from 'zod'

export const getLikeInputSchema = z.object({
  slug: z.string()
})

export const likeSchema = z.object({
  likes: z.number(),
  currentUserLikes: z.number()
})

export const incrementLikeInputSchema = z.object({
  slug: z.string().min(1),
  value: z.number().int().positive().min(1).max(3)
})
