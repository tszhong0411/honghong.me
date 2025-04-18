'use client'

import type { GetCommentsOutput } from '@/trpc/routers/comments'

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@tszhong0411/ui'
import { useState } from 'react'

type Comment = GetCommentsOutput['comments'][number]

type CommentsTableProps = {
  data: Comment[]
}

const CommentsTable = (props: CommentsTableProps) => {
  const { data } = props
  const t = useTranslations()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: Array<ColumnDef<Comment>> = [
    {
      accessorKey: 'userId',
      header: t('admin.table.comments.userId')
    },
    {
      accessorKey: 'body',
      header: t('admin.table.comments.body')
    },
    {
      accessorKey: 'type',
      header: t('admin.table.comments.type')
    },
    {
      accessorKey: 'createdAt',
      header: t('admin.table.comments.createdAt'),
      cell: ({ row }) => row.original.createdAt.toLocaleString()
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter user id...'
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- ignore for now
          value={(table.getColumn('userId')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('userId')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
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
    </div>
  )
}

export default CommentsTable
