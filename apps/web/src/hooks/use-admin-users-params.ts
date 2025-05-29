import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp,
  useQueryStates
} from 'nuqs'
import { z } from 'zod'

import { USER_ROLES } from '@/lib/constants'

export const useAdminUsersParams = () => {
  return useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString.withDefault(''),
    role: parseAsArrayOf(z.enum(USER_ROLES)).withDefault([]),
    createdAt: parseAsArrayOf(parseAsTimestamp).withDefault([])
  })
}
