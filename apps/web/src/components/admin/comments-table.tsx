'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Checkbox,
  DataTable,
  DataTableColumnHeader,
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
}

const getTypeIcon = (type: (typeof COMMENT_TYPES)[number]) => {
  const icons = {
    comment: MessageSquareIcon,
    reply: MessageSquareMoreIcon
  }

  return icons[type]
}

const CommentsTable = (props: CommentsTableProps) => {
  const { data, pageCount } = props
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
      )
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
        variant: 'text',
        icon: Text
      },
      enableColumnFilter: true
    },
    {
      id: 'type',
      accessorKey: 'type',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('admin.table.comments.type')} />
      ),
      meta: {
        label: 'Type',
        variant: 'multiSelect',
        options: COMMENT_TYPES.map((type) => ({
          label: type.charAt(0).toUpperCase() + type.slice(1),
          value: type,
          count: 0,
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
        <DataTableColumnHeader column={column} title={t('admin.table.comments.createdAt')} />
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
    pageCount
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}></DataTableToolbar>
    </DataTable>
  )
}

export default CommentsTable
