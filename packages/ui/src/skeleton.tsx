import { cn } from '@tszhong0411/utils'
import * as React from 'react'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <div
        className={cn('bg-border animate-pulse rounded-md', className)}
        ref={ref}
        {...rest}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }
