import cn from '@/utils/cn'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

const Skeleton = (props: SkeletonProps) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn('animate-pulse rounded-md bg-border', className)}
      {...rest}
    />
  )
}

export { Skeleton }
