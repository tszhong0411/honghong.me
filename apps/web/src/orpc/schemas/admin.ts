import { comments, users } from '@tszhong0411/db'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { COMMENT_TYPES, USER_ROLES } from '@/lib/constants'

export const listAllCommentsInputSchema = z.object({
  page: z.number().min(1).default(1),
  perPage: z.number().min(1).default(10),
  body: z.string(),
  parentId: z.array(z.enum(COMMENT_TYPES)).default([]),
  createdAt: z.array(z.coerce.date().optional()).default([]),
  sort: z
    .array(
      z.object({
        id: z.string() as z.ZodType<keyof typeof comments.$inferSelect>,
        desc: z.boolean()
      })
    )
    .default([{ id: 'createdAt', desc: true }])
})

export const listAllCommentsSchema = z.object({
  comments: z.array(createSelectSchema(comments)),
  pageCount: z.number(),
  typeCounts: z.object({
    comment: z.number(),
    reply: z.number()
  })
})

export const listAllUsersInputSchema = z.object({
  page: z.number().min(1).default(1),
  perPage: z.number().min(1).default(10),
  name: z.string(),
  role: z.array(z.enum(USER_ROLES)).default([]),
  createdAt: z.array(z.coerce.date().optional()).default([]),
  sort: z
    .array(
      z.object({
        id: z.string() as z.ZodType<keyof typeof users.$inferSelect>,
        desc: z.boolean().default(false)
      })
    )
    .default([{ id: 'createdAt', desc: true }])
})

export const listAllUsersSchema = z.object({
  users: z.array(
    createSelectSchema(users).pick({
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    })
  ),
  pageCount: z.number(),
  roleCounts: z.object({
    user: z.number(),
    admin: z.number()
  })
})
