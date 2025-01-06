'use client'

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@tszhong0411/ui'

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
