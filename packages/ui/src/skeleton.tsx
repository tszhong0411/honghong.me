import { cn } from '@tszhong0411/utils'

type SkeletonProps = React.ComponentProps<'div'>

export const Skeleton = (props: SkeletonProps) => {
  const { className, ...rest } = props

  return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...rest} />
}

Skeleton.displayName = 'Skeleton'
