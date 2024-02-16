import type { Metadata } from 'next'

import GoHomepage from '@/components/go-homepage'

export const metadata: Metadata = {
  title: '404'
}

const NotFound = () => {
  return (
    <div className='mb-40 mt-52 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>404 Not Found</h1>
      <GoHomepage />
    </div>
  )
}

export default NotFound
