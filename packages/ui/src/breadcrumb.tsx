import { Slot } from '@radix-ui/react-slot'
import { cn } from '@tszhong0411/utils'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

type BreadcrumbProps = {
  separator?: React.ReactNode
} & React.ComponentProps<'nav'>

export const Breadcrumb = (props: BreadcrumbProps) => <nav aria-label='breadcrumb' {...props} />

type BreadcrumbListProps = React.ComponentProps<'ol'>

export const BreadcrumbList = (props: BreadcrumbListProps) => {
  const { className, ...rest } = props

  return (
    <ol
      className={cn(
        'text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
        className
      )}
      {...rest}
    />
  )
}

type BreadcrumbItemProps = React.ComponentProps<'li'>

export const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const { className, ...rest } = props

  return <li className={cn('inline-flex items-center gap-1.5', className)} {...rest} />
}

type BreadcrumbLinkProps = {
  asChild?: boolean
} & React.ComponentProps<'a'>

export const BreadcrumbLink = (props: BreadcrumbLinkProps) => {
  const { asChild, className, ...rest } = props
  const Comp = asChild ? Slot : 'a'

  return <Comp className={cn('hover:text-foreground transition-colors', className)} {...rest} />
}

type BreadcrumbPageProps = React.ComponentProps<'span'>

export const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const { className, ...rest } = props

  return (
    <span
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-foreground font-normal', className)}
      {...rest}
    />
  )
}

type BreadcrumbSeparatorProps = React.ComponentProps<'li'>

export const BreadcrumbSeparator = (props: BreadcrumbSeparatorProps) => {
  const { children, className, ...rest } = props

  return (
    <li role='presentation' aria-hidden='true' className={cn(className)} {...rest}>
      {children ?? <ChevronRightIcon className='size-3.5' />}
    </li>
  )
}

type BreadcrumbEllipsisProps = React.ComponentProps<'span'>

export const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const { className, ...rest } = props

  return (
    <span
      role='presentation'
      aria-hidden='true'
      className={cn('flex size-9 items-center justify-center', className)}
      {...rest}
    >
      <MoreHorizontalIcon className='size-4' />
      <span className='sr-only'>More</span>
    </span>
  )
}
