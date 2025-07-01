import {
  and,
  asc,
  comments,
  count,
  desc,
  gte,
  ilike,
  isNotNull,
  isNull,
  lte,
  or,
  type SQLWrapper
} from '@tszhong0411/db'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

import { COMMENT_TYPES } from '@/lib/constants'
import { adminProcedure } from '@/orpc/root'

const getParentIdFilter = (parentId: Array<(typeof COMMENT_TYPES)[number]>) => {
  const conditions: SQLWrapper[] = []
  if (parentId.includes('comment')) conditions.push(isNull(comments.parentId))
  if (parentId.includes('reply')) conditions.push(isNotNull(comments.parentId))
  return conditions.length > 0 ? or(...conditions) : void 0
}

const getDateFilter = (from?: Date, to?: Date) => {
  const conditions: SQLWrapper[] = []
  if (from) conditions.push(gte(comments.createdAt, from))
  if (to) conditions.push(lte(comments.createdAt, to))
  return conditions.length > 0 ? and(...conditions) : void 0
}

export const getComments = adminProcedure
  .input(
    z.object({
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
  )
  .output(
    z.object({
      comments: z.array(createSelectSchema(comments)),
      pageCount: z.number(),
      typeCounts: z.object({
        comment: z.number(),
        reply: z.number()
      })
    })
  )
  .handler(async ({ input, context }) => {
    const offset = (input.page - 1) * input.perPage

    const createdFrom = input.createdAt[0]
    const createdTo = input.createdAt[1]

    if (createdFrom) createdFrom.setHours(0, 0, 0, 0)
    if (createdTo) createdTo.setHours(23, 59, 59, 999)

    const orderBy =
      input.sort.length > 0
        ? input.sort.map((item) => (item.desc ? desc(comments[item.id]) : asc(comments[item.id])))
        : [asc(comments.createdAt)]

    const query = await context.db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(comments)
        .limit(input.perPage)
        .where(
          and(
            input.body ? ilike(comments.body, `%${input.body}%`) : undefined,
            input.parentId.length > 0 ? getParentIdFilter(input.parentId) : undefined,
            input.createdAt.length > 0 ? getDateFilter(createdFrom, createdTo) : undefined
          )
        )
        .offset(offset)
        .orderBy(...orderBy)

      const total = await tx
        .select({
          count: count()
        })
        .from(comments)
        .execute()
        .then((res) => res[0]?.count ?? 0)

      const typeCounts = await tx
        .select({
          parentId: comments.parentId,
          count: count()
        })
        .from(comments)
        .groupBy(comments.parentId)
        .then((res) => {
          const result = {
            comment: 0,
            reply: 0
          }
          for (const { parentId, count: typeCount } of res) {
            if (parentId) {
              result.reply += typeCount
            } else {
              result.comment = typeCount
            }
          }
          return result
        })

      return { data, total, typeCounts }
    })

    return {
      comments: query.data,
      pageCount: Math.ceil(query.total / input.perPage),
      typeCounts: query.typeCounts
    }
  })
