import { Slot } from '@radix-ui/react-slot'
import { cn } from '@tszhong0411/utils'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

type BreadcrumbProps = {
  separator?: React.ReactNode
} & React.ComponentProps<'nav'>

const Breadcrumb = (props: BreadcrumbProps) => <nav aria-label='Breadcrumb' {...props} />

type BreadcrumbListProps = React.ComponentProps<'ol'>

const BreadcrumbList = (props: BreadcrumbListProps) => {
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

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const { className, ...rest } = props

  return <li className={cn('inline-flex items-center gap-1.5', className)} {...rest} />
}

type BreadcrumbLinkProps = {
  asChild?: boolean
} & React.ComponentProps<'a'>

const BreadcrumbLink = (props: BreadcrumbLinkProps) => {
  const { asChild, className, ...rest } = props
  const Comp = asChild ? Slot : 'a'
  const pathname = usePathname()

  return (
    <Comp
      className={cn('hover:text-foreground transition-colors', className)}
      aria-current={props.href === pathname ? 'page' : undefined}
      {...rest}
    />
  )
}

type BreadcrumbPageProps = React.ComponentProps<'span'>

const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const { className, ...rest } = props

  return (
    <span
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn('text-foreground font-medium', className)}
      {...rest}
    />
  )
}

type BreadcrumbSeparatorProps = React.ComponentProps<'li'>

const BreadcrumbSeparator = (props: BreadcrumbSeparatorProps) => {
  const { children, className, ...rest } = props

  return (
    <li
      role='presentation'
      aria-hidden='true'
      className={cn('text-muted-foreground', className)}
      {...rest}
    >
      {children ?? <ChevronRightIcon className='size-3.5' />}
    </li>
  )
}

type BreadcrumbEllipsisProps = React.ComponentProps<'span'>

const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const { className, ...rest } = props

  return (
    <span
      role='presentation'
      aria-hidden='true'
      className={cn('text-muted-foreground flex size-9 items-center justify-center', className)}
      {...rest}
    >
      <MoreHorizontalIcon className='size-4' />
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
}
