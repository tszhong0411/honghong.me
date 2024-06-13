import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

export const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <div className='relative w-full overflow-auto'>
        <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...rest} />
      </div>
    )
  }
)

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { className, ...rest } = props

  return <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...rest} />
})

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { className, ...rest } = props

  return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...rest} />
})

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <tfoot
      ref={ref}
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...rest}
    />
  )
})

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <tr
        ref={ref}
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
)

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <th
      ref={ref}
      className={cn(
        'text-muted-foreground h-12 px-4 text-left align-middle font-medium',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...rest}
    />
  )
})

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <td
      ref={ref}
      className={cn('p-4 align-middle', '[&:has([role=checkbox])]:pr-0', className)}
      {...rest}
    />
  )
})

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <caption ref={ref} className={cn('text-muted-foreground mt-4 text-sm', className)} {...rest} />
  )
})

Table.displayName = 'Table'
TableHeader.displayName = 'TableHeader'
TableBody.displayName = 'TableBody'
TableFooter.displayName = 'TableFooter'
TableRow.displayName = 'TableRow'
TableHead.displayName = 'TableHead'
TableCell.displayName = 'TableCell'
TableCaption.displayName = 'TableCaption'
