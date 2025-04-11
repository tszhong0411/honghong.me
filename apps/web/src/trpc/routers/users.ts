import type { RouterOutputs } from '../client'

import { adminProcedure, createTRPCRouter } from '../init'

export const usersRouter = createTRPCRouter({
  getUsers: adminProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.query.users.findMany({
      columns: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    return {
      users: result
    }
  })
})

export type GetUsersOutput = RouterOutputs['users']['getUsers']
