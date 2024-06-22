import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const { className, ...rest } = props

  return <div ref={ref} className={cn('bg-muted animate-pulse rounded-md', className)} {...rest} />
})

Skeleton.displayName = 'Skeleton'
