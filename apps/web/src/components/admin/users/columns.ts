import type { ColumnDef } from '@tanstack/react-table'

import type { UsersOutput } from '@/trpc/routers/users'

export type User = UsersOutput['users'][number]

export const columns: Array<ColumnDef<User>> = [
  {
    header: 'Name',
    accessorKey: 'name'
  },
  {
    header: 'Email',
    accessorKey: 'email'
  },
  {
    header: 'Role',
    accessorKey: 'role'
  }
]
