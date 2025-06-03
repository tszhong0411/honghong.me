'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Checkbox,
  DataTable,
  DataTableColumnHeader,
  DataTableSortList,
  DataTableToolbar,
  formatDate,
  useDataTable
} from '@tszhong0411/ui'
import {
  CalendarIcon,
  CircleDashedIcon,
  MessageSquareIcon,
  MessageSquareMoreIcon
} from 'lucide-react'

import { COMMENT_TYPES } from '@/lib/constants'
import { type GetCommentsOutput } from '@/trpc/routers/comments'

type Comment = GetCommentsOutput['comments'][number]

type CommentsTableProps = {
  data: Comment[]
  pageCount: number
  typeCounts: Record<string, number>
}

const getTypeIcon = (type: (typeof COMMENT_TYPES)[number]) => {
  const icons = {
    comment: MessageSquareIcon,
    reply: MessageSquareMoreIcon
  }

  return icons[type]
}

const CommentsTable = (props: CommentsTableProps) => {
  const { data, pageCount, typeCounts } = props
  const t = useTranslations()

  const columns: Array<ColumnDef<Comment>> = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40
    },
    {
      id: 'userId',
      accessorKey: 'userId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.userId')} />
      ),
      meta: {
        label: 'User ID'
      }
    },
    {
      id: 'body',
      accessorKey: 'body',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.body')} />
      ),
      meta: {
        label: 'Body',
        placeholder: 'Search body...',
        variant: 'text'
      },
      enableColumnFilter: true
    },
    {
      id: 'parentId',
      accessorKey: 'parentId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.type')} />
      ),
      cell: ({ row }) => {
        return row.original.parentId ? 'reply' : 'comment'
      },
      meta: {
        label: 'Type',
        variant: 'multiSelect',
        options: COMMENT_TYPES.map((type) => ({
          label: type.charAt(0).toUpperCase() + type.slice(1),
          value: type,
          count: typeCounts[type],
          icon: getTypeIcon(type)
        })),
        icon: CircleDashedIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.createdAt')} />
      ),
      cell: ({ row }) =>
        formatDate(row.original.createdAt, {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon
      },
      enableColumnFilter: true
    }
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }]
    }
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align='end' />
      </DataTableToolbar>
    </DataTable>
  )
}

export default CommentsTable
