import PageTitle from '@/components/page-title'
import { Skeleton } from '@/components/ui'
import range from '@/utils/range'

import Pinned from './pinned'

const Placeholder = () => (
  <div className='rounded-lg border bg-accent p-4'>
    <div className='mb-3 flex gap-3'>
      <Skeleton className='size-10 rounded-full' />
      <div className='flex flex-col justify-center gap-1'>
        <Skeleton className='h-4 w-40 rounded-md' />
        <Skeleton className='h-4 w-36 rounded-md' />
      </div>
    </div>
    <Skeleton className='h-6 w-full max-w-xs rounded-md pl-[52px]' />
  </div>
)

const Loading = () => {
  return (
    <>
      <PageTitle
        title='Guestbook'
        description='You can tell me anything here!'
        animate={false}
      />
      <div className='mx-auto max-w-lg'>
        <Pinned />
        <div className='mt-10 flex flex-col gap-4'>
          {range(0, 8).map((i) => (
            <Placeholder key={i} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Loading
