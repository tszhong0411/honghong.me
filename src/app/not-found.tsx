import type { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui'

export const metadata: Metadata = {
  title: '404'
}

const NotFound = () => {
  return (
    <div className='mb-40 mt-52 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>404 Not Found</h1>
      <Link href='/' className={buttonVariants({})}>
        Go homepage
      </Link>
    </div>
  )
}

export default NotFound
