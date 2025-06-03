import type { comments } from '@tszhong0411/db'

import { getSortingStateParser } from '@tszhong0411/ui'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp,
  useQueryStates
} from 'nuqs'
import { z } from 'zod'

import { COMMENT_TYPES } from '@/lib/constants'

export const useAdminCommentsParams = () => {
  return useQueryStates({
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
