import Skeleton from '@/components/Skeleton'

const Loader = () => {
  return (
    <div className='rounded-lg border border-accent-2 p-4'>
      <div className='mb-3 flex gap-3'>
        <Skeleton className='h-10 w-10 rounded-full' />
        <div className='flex flex-col justify-center gap-1'>
          <Skeleton className='h-3 w-16' />
          <Skeleton className='h-3 w-20' />
        </div>
      </div>
      <div className='pl-[52px]'>
        <Skeleton className='h-5' />
      </div>
    </div>
  )
}

export default Loader
