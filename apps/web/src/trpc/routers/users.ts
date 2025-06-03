import type { RouterOutputs } from '../client'

import {
  and,
  asc,
  count,
  desc,
  gt,
  gte,
  ilike,
  inArray,
  lte,
  type SQLWrapper,
  users
} from '@tszhong0411/db'
import { z } from 'zod'

import { USER_ROLES } from '@/lib/constants'

import { adminProcedure, createTRPCRouter } from '../init'

const getDateFilter = (from?: Date, to?: Date) => {
  const conditions: SQLWrapper[] = []
  if (from) conditions.push(gte(users.createdAt, from))
  if (to) conditions.push(lte(users.createdAt, to))
  return conditions.length > 0 ? and(...conditions) : void 0
}

export const usersRouter = createTRPCRouter({
  getUsers: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        perPage: z.number().min(1).default(10),
        name: z.string().optional(),
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
    )
    .query(async ({ ctx, input }) => {
      const offset = (input.page - 1) * input.perPage

      const createdFrom = input.createdAt[0]
      const createdTo = input.createdAt[1]

      if (createdFrom) createdFrom.setHours(0, 0, 0, 0)
      if (createdTo) createdTo.setHours(23, 59, 59, 999)

      const orderBy =
        input.sort.length > 0
          ? input.sort.map((item) => (item.desc ? desc(users[item.id]) : asc(users[item.id])))
          : [asc(users.createdAt)]

      const query = await ctx.db.transaction(async (tx) => {
        const data = await tx
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            createdAt: users.createdAt
          })
          .from(users)
          .limit(input.perPage)
          .where(
            and(
              input.name ? ilike(users.name, `%${input.name}%`) : undefined,
              input.role.length > 0 ? inArray(users.role, input.role) : undefined,
              input.createdAt.length > 0 ? getDateFilter(createdFrom, createdTo) : undefined
            )
          )
          .offset(offset)
          .orderBy(...orderBy)

        const total = await tx
          .select({
            count: count()
          })
          .from(users)
          .execute()
          .then((res) => res[0]?.count ?? 0)

        const roleCounts = await tx
          .select({
            role: users.role,
            count: count()
          })
          .from(users)
          .groupBy(users.role)
          .having(gt(count(users.role), 0))
          .then((res) => {
            const result = {
              user: 0,
              admin: 0
            }
            for (const { role, count: roleCount } of res) {
              result[role] = roleCount
            }
            return result
          })

        return { data, total, roleCounts }
      })

      return {
        users: query.data,
        pageCount: Math.ceil(query.total / input.perPage),
        roleCounts: query.roleCounts
      }
    })
})

export type GetUsersOutput = RouterOutputs['users']['getUsers']
