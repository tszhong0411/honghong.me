import { Pagination as PaginationPrimitive } from '@ark-ui/react/pagination'
import { cn } from '@tszhong0411/utils'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'

import { type ButtonProps, buttonVariants } from './button'

const PaginationContext = PaginationPrimitive.Context

type PaginationProps = React.ComponentProps<typeof PaginationPrimitive.Root>

const Pagination = (props: PaginationProps) => {
  const { className, translations, ...rest } = props

  return (
    <PaginationPrimitive.Root
      translations={{
        // Capitalize the first letter
        nextTriggerLabel: 'Next page',
        prevTriggerLabel: 'Previous page',
        itemLabel: (details) => `Page ${details.page}`,
        ...translations
      }}
      className={cn('mx-auto flex w-full flex-wrap items-center justify-center gap-1', className)}
      {...rest}
    />
  )
}

type PaginationItemProps = React.ComponentProps<typeof PaginationPrimitive.Item>

const PaginationItem = (props: PaginationItemProps) => {
  const { className, value, ...rest } = props

  return (
    <PaginationContext>
      {(context) => (
        <PaginationPrimitive.Item
          className={cn(
            buttonVariants({ variant: context.page === value ? 'outline' : 'ghost', size: 'icon' }),
            className
          )}
          value={value}
          {...rest}
        />
      )}
    </PaginationContext>
  )
}

type PaginationPrevTriggerProps = React.ComponentProps<typeof PaginationPrimitive.PrevTrigger> &
  Pick<ButtonProps, 'size'>

const PaginationPrevTrigger = (props: PaginationPrevTriggerProps) => {
  const { className, size = 'default', ...rest } = props

  return (
    <PaginationPrimitive.PrevTrigger
      className={cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 pl-2.5', className)}
      {...rest}
    >
      <ChevronLeftIcon className='size-4' />
      <span>Previous</span>
    </PaginationPrimitive.PrevTrigger>
  )
}

type PaginationNextTriggerProps = React.ComponentProps<typeof PaginationPrimitive.NextTrigger> &
  Pick<ButtonProps, 'size'>

const PaginationNextTrigger = (props: PaginationNextTriggerProps) => {
  const { className, size = 'default', ...rest } = props

  return (
    <PaginationPrimitive.NextTrigger
      className={cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 pr-2.5', className)}
      {...rest}
    >
      <span>Next</span>
      <ChevronRightIcon className='size-4' />
    </PaginationPrimitive.NextTrigger>
  )
}

type PaginationEllipsisProps = React.ComponentProps<typeof PaginationPrimitive.Ellipsis>

const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const { className, ...rest } = props

  return (
    <PaginationPrimitive.Ellipsis
      className={cn('flex size-9 items-center justify-center', className)}
      aria-label='More pages'
      {...rest}
    >
      <MoreHorizontalIcon className='size-4' aria-hidden='true' />
    </PaginationPrimitive.Ellipsis>
  )
}

export {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger
}
