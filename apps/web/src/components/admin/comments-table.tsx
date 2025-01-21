'use client'

import type { GetCommentsOutput } from '@/trpc/routers/comments'

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable
} from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  DataTable,
  DataTableColumnHeader,
  type DataTableFilterField,
  DataTableToolbar
} from '@tszhong0411/ui'
import { useState } from 'react'

type Comment = GetCommentsOutput['comments'][number]

type CommentsTableProps = {
  data: Comment[]
}

const CommentsTable = (props: CommentsTableProps) => {
  const { data } = props
  const t = useTranslations()
  const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }])

  const columns: Array<ColumnDef<Comment>> = [
    {
      accessorKey: 'userId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.userId')} />
      )
    },
    {
      accessorKey: 'body',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.body')} />
      )
    },
    {
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.type')} />
      )
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.createdAt')} />
      ),
      cell: ({ row }) => row.original.createdAt.toLocaleString()
    }
  ]

  const filterFields: Array<DataTableFilterField<Comment>> = [
    {
      id: 'userId',
      label: t('admin.table.comments.userId'),
      placeholder: t('admin.table.comments.filter-userId')
    },
    {
      id: 'body',
      label: t('admin.table.comments.body'),
      placeholder: t('admin.table.comments.filter-body')
    }
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
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

export default CommentsTable
