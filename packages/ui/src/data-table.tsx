import { type Column, flexRender, type Table as TanstackTable } from '@tanstack/react-table'
import { cn, range } from '@tszhong0411/utils'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
  PlusCircleIcon,
  Settings2Icon,
  XIcon
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Badge } from './badge'
import { Button } from './button'
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxInput,
  type ComboboxInputValueChangeDetails,
  ComboboxItem,
  ComboboxItemText,
  type ComboboxValueChangeDetails,
  createListCollection
} from './combobox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './dropdown-menu'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Separator } from './separator'
import { Skeleton } from './skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'

type DataTableProps<TData> = {
  table: TanstackTable<TData>
} & React.ComponentProps<'div'>

const DataTable = <TData,>(props: DataTableProps<TData>) => {
  const { table, children, ...rest } = props

  return (
    <div className='w-full space-y-2.5' {...rest}>
      {children}
      <div className='rounded-lg border'>
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
                <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex flex-col gap-2.5'>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}

type DataTablePaginationProps<TData> = {
  table: TanstackTable<TData>
  pageSizeOptions?: number[]
}

const defaultPageSizeOptions = [10, 20, 30, 40, 50]

const DataTablePagination = <TData,>(props: DataTablePaginationProps<TData>) => {
  const { table, pageSizeOptions = defaultPageSizeOptions } = props

  return (
    <div className='flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8'>
      <div className='text-muted-foreground flex-1 whitespace-nowrap text-sm'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center gap-2'>
          <p className='whitespace-nowrap text-sm font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[4.5rem]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center gap-2'>
          <Button
            aria-label='Go to first page'
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to previous page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to next page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to last page'
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon className='size-4' aria-hidden='true' />
          </Button>
        </div>
      </div>
    </div>
  )
}

type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
} & React.ComponentProps<'div'>

const DataTableColumnHeader = <TData, TValue>(props: DataTableColumnHeaderProps<TData, TValue>) => {
  const { column, title, className } = props

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const isDesc = column.getIsSorted() === 'desc'
  const isAsc = column.getIsSorted() === 'asc'
  const isUnsorted = !isDesc && !isAsc

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm' className='data-[state=open]:bg-accent -ml-3 h-8'>
            <span>{title}</span>
            {isDesc ? <ArrowDownIcon className='ml-2.5 size-4' /> : null}
            {isAsc ? <ArrowUpIcon className='ml-2.5 size-4' /> : null}
            {isUnsorted ? <ChevronsUpDownIcon className='ml-2.5 size-4' /> : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='text-muted-foreground/70 mr-2 size-3.5' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='text-muted-foreground/70 mr-2 size-3.5' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon className='text-muted-foreground/70 mr-2 size-3.5' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

type DataTableViewOptionsProps<TData> = {
  table: TanstackTable<TData>
}

const DataTableViewOptions = <TData,>(props: DataTableViewOptionsProps<TData>) => {
  const { table } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <Settings2Icon className='mr-2 size-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.accessorFn !== undefined && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  column.toggleVisibility(!!value)
                }}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type Option = {
  label: string
  value: string
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

type DataTableFilterField<TData> = {
  id: Extract<keyof TData, string>
  label: string
  placeholder?: string
  options?: Option[]
}

type DataTableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>
  title?: string
  options: Option[]
}

const DataTableFacetedFilter = <TData, TValue>(
  props: DataTableFacetedFilterProps<TData, TValue>
) => {
  const { column, title, options } = props
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])
  const [collection, setCollection] = useState(() => createListCollection({ items: options }))

  const handleInputValueChange = (details: ComboboxInputValueChangeDetails) => {
    const filtered = options.filter((item) =>
      item.label.toLowerCase().includes(details.inputValue.toLowerCase())
    )

    if (filtered.length > 0) setCollection(() => createListCollection({ items: filtered }))
    else setCollection(() => createListCollection({ items: [] }))
  }

  const handleValueChange = (details: ComboboxValueChangeDetails) => {
    if (!Array.isArray(details.value)) return
    selectedValues.clear()
    for (const value of details.value) selectedValues.add(value)
    const filterValues = [...selectedValues]
    column?.setFilterValue(filterValues.length > 0 ? filterValues : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <PlusCircleIcon className='mr-2 size-4' />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge variant='secondary' className='rounded-xs px-1 font-normal lg:hidden'>
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge variant='secondary' className='rounded-xs px-1 font-normal'>
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-xs px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0' align='start'>
        <Combobox
          collection={collection}
          onValueChange={handleValueChange}
          onInputValueChange={handleInputValueChange}
          multiple
          open
        >
          <ComboboxInput
            placeholder={title}
            className='rounded-none border-0 border-b bg-transparent py-0 text-sm focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
          />
          <ComboboxContent className='data-[state=closed]:animate-none! data-[state=open]:animate-none! rounded-none border-0 bg-transparent p-1 shadow-none'>
            {collection.items.length === 0 ? (
              <div className='py-6 text-center text-sm'>No results found.</div>
            ) : null}
            {collection.items.map((item) => (
              <ComboboxItem key={item.value} item={item}>
                <div
                  className={cn(
                    'border-primary rounded-xs mr-2 flex size-4 items-center justify-center border',
                    selectedValues.has(item.value)
                      ? 'bg-primary text-primary-foreground'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <CheckIcon />
                </div>
                {item.icon && <item.icon className='text-muted-foreground mr-2 size-4' />}
                <ComboboxItemText>{item.label}</ComboboxItemText>
                {facets?.get(item.value) !== undefined && (
                  <span className='ml-auto flex size-4 items-center justify-center font-mono text-xs'>
                    {facets.get(item.value)}
                  </span>
                )}
              </ComboboxItem>
            ))}
          </ComboboxContent>
          {selectedValues.size > 0 && (
            <>
              <Separator />
              <div className='p-1'>
                <ComboboxClearTrigger asChild>
                  <Button
                    variant='ghost'
                    onClick={() => {
                      column?.setFilterValue(undefined)
                      console.log(selectedValues)
                    }}
                    className='h-8 w-full rounded-md'
                  >
                    Clear filters
                  </Button>
                </ComboboxClearTrigger>
              </div>
            </>
          )}
        </Combobox>
      </PopoverContent>
    </Popover>
  )
}

type DataTableToolbarProps<TData> = {
  table: TanstackTable<TData>
  filterFields?: Array<DataTableFilterField<TData>>
}

const defaultFilterFields: Array<DataTableFilterField<unknown>> = []

const DataTableToolbar = <TData,>(props: DataTableToolbarProps<TData>) => {
  const { table, filterFields = defaultFilterFields } = props

  const { searchableColumns, filterableColumns } = useMemo(
    () => ({
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options)
    }),
    [filterFields]
  )

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center gap-2'>
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <Input
                  key={String(column.id)}
                  placeholder={column.placeholder}
                  value={
                    (table.getColumn(String(column.id))?.getFilterValue() as string | undefined) ??
                    ''
                  }
                  onChange={(event) =>
                    table.getColumn(String(column.id))?.setFilterValue(event.target.value)
                  }
                  className='h-8 w-40 lg:w-64'
                />
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : '')}
                  title={column.label}
                  options={column.options ?? []}
                />
              )
          )}
        {isFiltered && (
          <Button
            variant='ghost'
            className='h-8 px-2 lg:px-3'
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <XIcon className='ml-2 size-4' aria-hidden='true' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

/**
 * shadcn-table (MIT License)
 * Copyright (c) Sadman Sakib
 * Source: https://github.com/sadmann7/shadcn-table/blob/88abb37998be2ceb1c9b558beff05bb7d839b8cc/src/components/data-table/data-table-skeleton.tsx
 *
 * Modified by: tszhong0411
 */
type DataTableSkeletonProps = {
  columnCount: number
  rowCount?: number
  searchableColumnsCount?: number
  filterableColumnCount?: number
  cellWidths?: string[]
} & React.ComponentProps<'div'>

const defaultCellWidths = ['auto']

const DataTableSkeleton = (props: DataTableSkeletonProps) => {
  const {
    columnCount,
    rowCount = 10,
    searchableColumnsCount = 0,
    filterableColumnCount = 0,
    cellWidths = defaultCellWidths,
    className,
    ...rest
  } = props

  return (
    <div className={cn('w-full space-y-2.5', className)} {...rest}>
      {/* Toolbar skeleton */}
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center gap-2'>
          {searchableColumnsCount > 0 &&
            range(searchableColumnsCount).map((i) => (
              <Skeleton key={i} className='h-8 w-40 lg:w-60' />
            ))}
          {filterableColumnCount > 0 &&
            range(filterableColumnCount).map((i) => (
              <Skeleton key={i} className='h-8 w-[4.5rem] border-dashed' />
            ))}
        </div>
        <Skeleton className='ml-auto hidden h-8 w-[4.5rem] lg:flex' />
      </div>
      {/* Table skeleton */}
      <div className='rounded-lg border'>
        <Table>
          <TableHeader>
            {range(1).map((i) => (
              <TableRow key={i} className='hover:bg-transparent'>
                {range(columnCount).map((j) => (
                  <TableHead
                    key={j}
                    style={{
                      width: cellWidths[j],
                      minWidth: cellWidths[j]
                    }}
                  >
                    <Skeleton className='h-6 w-full' />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {range(rowCount).map((i) => (
              <TableRow key={i} className='hover:bg-transparent'>
                {range(columnCount).map((j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: cellWidths[j],
                      minWidth: cellWidths[j]
                    }}
                  >
                    <Skeleton className='h-6 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination skeleton */}
      <div className='flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8'>
        <Skeleton className='h-7 w-40 shrink-0' />
        <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-7 w-24' />
            <Skeleton className='h-7 w-[4.5rem]' />
          </div>
          <div className='flex items-center justify-center text-sm font-medium'>
            <Skeleton className='h-7 w-20' />
          </div>
          <div className='flex items-center gap-2'>
            <Skeleton className='hidden size-7 lg:block' />
            <Skeleton className='size-7' />
            <Skeleton className='size-7' />
            <Skeleton className='hidden size-7 lg:block' />
          </div>
        </div>
      </div>
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  type DataTableFilterField,
  DataTableSkeleton,
  DataTableToolbar
}
