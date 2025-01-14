import { cn } from '@tszhong0411/utils'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import Link from 'next/link'

import { type ButtonProps, buttonVariants } from './button'

type PaginationProps = React.ComponentProps<'nav'>

const Pagination = (props: PaginationProps) => {
  const { className, ...rest } = props

  return (
    <nav
      role='navigation'
      aria-label='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...rest}
    />
  )
}

type PaginationContentProps = React.ComponentProps<'ul'>

const PaginationContent = (props: PaginationContentProps) => {
  const { className, ...rest } = props

  return <ul className={cn('flex flex-row items-center gap-1', className)} {...rest} />
}

type PaginationItemProps = React.ComponentProps<'li'>

const PaginationItem = (props: PaginationItemProps) => {
  const { className, ...rest } = props

  return <li className={cn(className)} {...rest} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>

const PaginationLink = (props: PaginationLinkProps) => {
  const { className, isActive, size = 'icon', ...rest } = props

  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content -- it's a component
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size
        }),
        className
      )}
      {...rest}
    />
  )
}

type PaginationPreviousProps = React.ComponentProps<typeof PaginationLink>

const PaginationPrevious = (props: PaginationPreviousProps) => {
  const { className, ...rest } = props

  return (
    <PaginationLink size='default' className={cn('gap-1 pl-2.5', className)} {...rest}>
      <ChevronLeftIcon className='size-4' />
      <span>Previous</span>
    </PaginationLink>
  )
}

type PaginationNextProps = React.ComponentProps<typeof PaginationLink>

const PaginationNext = (props: PaginationNextProps) => {
  const { className, ...rest } = props

  return (
    <PaginationLink size='default' className={cn('gap-1 pr-2.5', className)} {...rest}>
      <span>Next</span>
      <ChevronRightIcon className='size-4' />
    </PaginationLink>
  )
}

type PaginationEllipsisProps = React.ComponentProps<'span'>

const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const { className, ...rest } = props

  return (
    <span className={cn('flex size-9 items-center justify-center', className)} {...rest}>
      <span className='sr-only'>More pages</span>
      <MoreHorizontalIcon className='size-4' aria-hidden='true' />
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
