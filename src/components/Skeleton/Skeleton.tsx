import clsxm from '@/lib/clsxm'

import { WithClassName } from '@/types'

type SkeletonProps = WithClassName

const Skeleton = (props: SkeletonProps) => {
  const { className } = props

  return (
    <div
      className={clsxm(
        'h-4 w-full animate-pulse rounded-md bg-zinc-800',
        className
      )}
    />
  )
}

export default Skeleton
