import { Skeleton } from '@tszhong0411/ui'

const SkeletonCard = () => {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  )
}

export default SkeletonCard
