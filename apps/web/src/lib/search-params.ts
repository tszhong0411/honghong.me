import type { comments, users } from '@tszhong0411/db'

import { getSortingStateParser } from '@tszhong0411/ui'
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp
} from 'nuqs/server'
import { z } from 'zod'

import { COMMENT_TYPES, USER_ROLES } from './constants'

export const searchParamsCaches = {
  adminUsers: createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString.withDefault(''),
    role: parseAsArrayOf(z.enum(USER_ROLES)).withDefault([]),
    createdAt: parseAsArrayOf(parseAsTimestamp).withDefault([]),
    sort: getSortingStateParser<typeof users.$inferSelect>().withDefault([
      { id: 'createdAt', desc: true }
    ])
  }),
  adminComments: createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    body: parseAsString.withDefault(''),
    parentId: parseAsArrayOf(z.enum(COMMENT_TYPES)).withDefault([]),
    createdAt: parseAsArrayOf(parseAsTimestamp).withDefault([]),
    sort: getSortingStateParser<typeof comments.$inferSelect>().withDefault([
      { id: 'createdAt', desc: true }
    ])
  })
}
