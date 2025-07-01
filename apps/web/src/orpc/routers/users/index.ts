import type { Outputs } from '@/orpc/client'

import { getUsers } from './get-users'

export const usersRouter = {
  getUsers
}

export type GetUsersOutput = Outputs['users']['getUsers']
