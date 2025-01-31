import { cn } from '@tszhong0411/utils'

type TableProps = React.ComponentProps<'table'>

const Table = (props: TableProps) => {
  const { className, ...rest } = props

  return (
    <div className='relative w-full overflow-auto'>
      {/* eslint-disable-next-line sonarjs/table-header -- this is a component */}
      <table className={cn('w-full caption-bottom text-sm', className)} {...rest} />
    </div>
  )
}

type TableHeaderProps = React.ComponentProps<'thead'>

const TableHeader = (props: TableHeaderProps) => {
  const { className, ...rest } = props

  return <thead className={cn('[&_tr]:border-b', className)} {...rest} />
}

type TableBodyProps = React.ComponentProps<'tbody'>

const TableBody = (props: TableBodyProps) => {
  const { className, ...rest } = props

  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...rest} />
}

type TableFooterProps = React.ComponentProps<'tfoot'>

const TableFooter = (props: TableFooterProps) => {
  const { className, ...rest } = props

  return (
    <tfoot
      className={cn('bg-muted/50 border-t font-medium last:[&>tr]:border-b-0', className)}
      {...rest}
    />
  )
}

type TableRowProps = React.ComponentProps<'tr'>

const TableRow = (props: TableRowProps) => {
  const { className, ...rest } = props

  return (
    <tr
      className={cn(
        'border-b transition-colors',
        'hover:bg-muted/50',
        'data-[state=selected]:bg-muted',
        className
      )}
      {...rest}
    />
  )
}

type TableHeadProps = React.ComponentProps<'th'>

const TableHead = (props: TableHeadProps) => {
  const { className, ...rest } = props

  return (
    <th
      className={cn(
        'text-muted-foreground h-12 px-4 text-left align-middle font-medium',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...rest}
    />
  )
}

type TableCellProps = React.ComponentProps<'td'>

const TableCell = (props: TableCellProps) => {
  const { className, ...rest } = props

  return (
    <td className={cn('p-4 align-middle', '[&:has([role=checkbox])]:pr-0', className)} {...rest} />
  )
}

type TableCaptionProps = React.ComponentProps<'caption'>

const TableCaption = (props: TableCaptionProps) => {
  const { className, ...rest } = props

  return <caption className={cn('text-muted-foreground mt-4 text-sm', className)} {...rest} />
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
