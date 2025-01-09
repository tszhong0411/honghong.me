import { cn } from '@tszhong0411/utils'

export const Table = (props: React.ComponentProps<'table'>) => {
  const { className, ...rest } = props

  return (
    <div className='relative w-full overflow-auto'>
      {/* eslint-disable-next-line sonarjs/table-header -- this is a component */}
      <table className={cn('w-full caption-bottom text-sm', className)} {...rest} />
    </div>
  )
}

export const TableHeader = (props: React.ComponentProps<'thead'>) => {
  const { className, ...rest } = props

  return <thead className={cn('[&_tr]:border-b', className)} {...rest} />
}

export const TableBody = (props: React.ComponentProps<'tbody'>) => {
  const { className, ...rest } = props

  return <tbody className={cn('[&_tr:last-child]:border-0', className)} {...rest} />
}

export const TableFooter = (props: React.ComponentProps<'tfoot'>) => {
  const { className, ...rest } = props

  return (
    <tfoot
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...rest}
    />
  )
}

export const TableRow = (props: React.ComponentProps<'tr'>) => {
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

export const TableHead = (props: React.ComponentProps<'th'>) => {
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

export const TableCell = (props: React.ComponentProps<'td'>) => {
  const { className, ...rest } = props

  return (
    <td className={cn('p-4 align-middle', '[&:has([role=checkbox])]:pr-0', className)} {...rest} />
  )
}

export const TableCaption = (props: React.ComponentProps<'caption'>) => {
  const { className, ...rest } = props

  return <caption className={cn('text-muted-foreground mt-4 text-sm', className)} {...rest} />
}
