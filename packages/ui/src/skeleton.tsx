import { cn } from '@tszhong0411/utils'

type SkeletonProps = React.ComponentProps<'div'>

const Skeleton = (props: SkeletonProps) => {
  const { className, ...rest } = props

  return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...rest} />
}

export { Skeleton }
