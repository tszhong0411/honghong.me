import type { UsersOutput } from '@/trpc/routers/users'

export type User = UsersOutput['users'][number]

export const columns = [
  {
    header: 'admin.table.users.name',
    accessorKey: 'name'
  },
  {
    header: 'admin.table.users.email',
    accessorKey: 'email'
  },
  {
    header: 'admin.table.users.role',
    accessorKey: 'role'
  }
] as const
