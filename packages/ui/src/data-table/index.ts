import type { DataTableConfig } from '../lib/data-table'
import type { ColumnSort, RowData } from '@tanstack/react-table'

export * from '../hooks/use-data-table'
export * from '../lib/data-table'
export * from './data-table'
export * from './data-table-column-header'
export * from './data-table-date-filter'
export * from './data-table-faceted-filter'
export * from './data-table-pagination'
export * from './data-table-skeleton'
export * from './data-table-slider-filter'
export * from './data-table-sort-list'
export * from './data-table-toolbar'
export * from './data-table-view-options'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars -- must have identical type parameters
  interface ColumnMeta<TData extends RowData, TValue> {
    label?: string
    placeholder?: string
    variant?: FilterVariant
    options?: Option[]
    range?: [number, number]
    unit?: string
    icon?: React.FC<React.SVGProps<SVGSVGElement>>
  }
}

export type Option = {
  label: string
  value: string
  count?: number
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export type FilterOperator = DataTableConfig['operators'][number]
export type FilterVariant = DataTableConfig['filterVariants'][number]
export type JoinOperator = DataTableConfig['joinOperators'][number]

export type ExtendedColumnSort<TData> = {
  id: Extract<keyof TData, string>
} & Omit<ColumnSort, 'id'>
