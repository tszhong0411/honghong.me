'use client'

import { faker } from '@faker-js/faker'
import { type ColumnDef } from '@tanstack/react-table'
import {
  Button,
  Checkbox,
  DataTable,
  DataTableColumnHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  formatDate,
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

const getPayments = () => {
  faker.seed(1)

  return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(['success', 'processing', 'failed']),
    amount: faker.number.int({ min: 0, max: 1000 }),
    createdAt: faker.date.recent({ days: 30 })
  }))
}

const data = getPayments()

const columns: Array<ColumnDef<Payment>> = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
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
      options: statuses.map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
        count: data.filter((payment) => payment.status === status).length,
        icon: getStatusIcon(status)
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
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)

      return <div className='text-right font-medium'>{formatted}</div>
    },
    meta: {
      label: 'Amount',
      variant: 'range',
      range: [0, 1000],
      unit: '$',
      icon: DollarSignIcon
    }
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

const DataTableDemo = () => {
  const { table } = useDataTable({
    data,
    columns,
    pageCount: 1
  })

  return <DataTable table={table} />
}

export default DataTableDemo
