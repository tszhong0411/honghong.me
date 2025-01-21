'use client'

import type { GetUsersOutput } from '@/trpc/routers/users'

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  DataTable,
  DataTableColumnHeader,
  type DataTableFilterField,
  DataTableToolbar
} from '@tszhong0411/ui'
import { UserCogIcon, UserIcon } from 'lucide-react'

type User = GetUsersOutput['users'][number]

type UsersTableProps = {
  data: User[]
}

const roles = [
  {
    value: 'user',
    label: 'User',
    icon: UserIcon
  },
  {
    value: 'admin',
    label: 'Admin',
    icon: UserCogIcon
  }
]

const UsersTable = (props: UsersTableProps) => {
  const { data } = props
  const t = useTranslations()

  const columns: Array<ColumnDef<User>> = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.users.name')} />
      )
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.users.email')} />
      )
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.users.role')} />
      )
    }
  ]

  const filterFields: Array<DataTableFilterField<User>> = [
    {
      id: 'name',
      label: t('admin.table.users.name'),
      placeholder: t('admin.table.users.filter-names')
    },
    {
      id: 'role',
      label: t('admin.table.users.role'),
      options: roles
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields} />
    </DataTable>
  )
}

export default UsersTable
