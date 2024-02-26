import { cn } from '@tszhong0411/utils'
import * as React from 'react'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <div
        className={cn('animate-pulse rounded-md bg-muted', className)}
        ref={ref}
        {...rest}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
