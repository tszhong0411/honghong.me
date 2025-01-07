'use client'

import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import { DataTable, type DataTableFilterField, DataTableToolbar } from '@tszhong0411/ui'

import type { UsersOutput } from '@/trpc/routers/users'

type User = UsersOutput['users'][number]

type UsersTableProps = {
  data: User[]
}

const UsersTable = (props: UsersTableProps) => {
  const { data } = props
  const t = useTranslations()

  const columns: Array<ColumnDef<User>> = [
    {
      header: t('admin.table.users.name'),
      accessorKey: 'name'
    },
    {
      header: t('admin.table.users.email'),
      accessorKey: 'email'
    },
    {
      header: t('admin.table.users.role'),
      accessorKey: 'role'
    }
  ]

  const filterFields: Array<DataTableFilterField<User>> = [
    {
      id: 'name',
      label: t('admin.table.users.name'),
      placeholder: t('admin.table.users.filter-names')
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} filterFields={filterFields} />
    </DataTable>
  )
}

export default UsersTable
