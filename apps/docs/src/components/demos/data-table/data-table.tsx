'use client'

import { faker } from '@faker-js/faker'
import { type ColumnDef } from '@tanstack/react-table'
import {
  Button,
  Checkbox,
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  formatDate,
  getSortingStateParser,
  useDataTable
} from '@tszhong0411/ui'
import {
  CalendarIcon,
  CheckIcon,
  CircleDashedIcon,
  ClockIcon,
  DollarSignIcon,
  MoreHorizontalIcon,
  UserIcon,
  XIcon
} from 'lucide-react'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsTimestamp,
  useQueryStates
} from 'nuqs'
import { z } from 'zod'

type Payment = {
  id: string
  name: string
  email: string
  status: 'success' | 'processing' | 'failed'
  amount: number
  createdAt: Date
}

const statuses: Array<Payment['status']> = ['success', 'processing', 'failed']

const getStatusIcon = (status: Payment['status']) => {
  switch (status) {
    case 'success': {
      return CheckIcon
    }
    case 'processing': {
      return ClockIcon
    }
    case 'failed': {
      return XIcon
    }
  }
}

const DataTableDemo = () => {
  const [{ page, perPage, name, status, amount, createdAt }] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    name: parseAsString.withDefault(''),
    status: parseAsArrayOf(z.enum(statuses as [string, ...string[]])).withDefault([]),
    amount: parseAsArrayOf(parseAsInteger).withDefault([0, 1000]),
    createdAt: parseAsArrayOf(parseAsTimestamp).withDefault([]),
    sort: getSortingStateParser<Payment>().withDefault([{ id: 'createdAt', desc: true }])
  })

  const getPayments = () => {
    faker.seed(1)

    const allPayments = Array.from({ length: 1000 }, () => ({
      id: faker.string.uuid(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      status: faker.helpers.arrayElement(['success', 'processing', 'failed']),
      amount: faker.number.int({ min: 0, max: 1000 }),
      createdAt: faker.date.recent({ days: 30 })
    }))

    let filtered = allPayments

    if (status.length > 0) {
      filtered = filtered.filter((payment) => status.includes(payment.status))
    }

    if (name) {
      const searchTerm = name.toLowerCase()
      filtered = filtered.filter((payment) => payment.name.toLowerCase().includes(searchTerm))
    }

    if (amount.length > 0) {
      const [from, to] = amount as [number, number]
      filtered = filtered.filter((payment) => payment.amount >= from && payment.amount <= to)
    }

    if (createdAt.length > 0) {
      const [from, to] = createdAt

      if (from || to) {
        filtered = filtered.filter((payment) => {
          const matchesFrom = from ? payment.createdAt >= from : true
          const matchesTo = to ? payment.createdAt <= to : true
          return matchesFrom && matchesTo
        })
      }
    }

    const offset = (page - 1) * perPage
    return {
      data: filtered.slice(offset, offset + perPage),
      total: filtered.length
    }
  }

  const { data, total } = getPayments()

  const columns: Array<ColumnDef<Payment>> = [
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
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
      meta: {
        label: 'Name',
        placeholder: 'Search names...',
        variant: 'text',
        icon: UserIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
      cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
      meta: {
        label: 'Email'
      }
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
      cell: ({ row }) => <div className='capitalize'>{row.getValue('status')}</div>,
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: statuses.map((s) => ({
          label: s.charAt(0).toUpperCase() + s.slice(1),
          value: s,
          count: data.filter((payment) => payment.status === s).length,
          icon: getStatusIcon(s)
        })),
        icon: CircleDashedIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Amount' />,
      cell: ({ row }) => {
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(row.getValue('amount')))

        return <div className='text-right font-medium'>{formatted}</div>
      },
      meta: {
        label: 'Amount',
        variant: 'range',
        range: [0, 1000],
        unit: '$',
        icon: DollarSignIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon
      },
      enableColumnFilter: true
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontalIcon />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 32
    }
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount: Math.ceil(total / perPage)
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}></DataTableToolbar>
    </DataTable>
  )
}

export default DataTableDemo
