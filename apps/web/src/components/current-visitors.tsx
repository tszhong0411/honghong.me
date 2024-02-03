'use client'

import { Link, Skeleton } from '@tszhong0411/ui'
import useSWR from 'swr'

import { env } from '@/env'
import fetcher from '@/lib/fetcher'
import { type Analytics } from '@/types'

const CurrentVisitors = () => {
  const { data } = useSWR<Analytics>('/api/analytics', fetcher, {
    refreshInterval: 30_000 // refresh every 30 seconds
  })

  return (
    <Link
      href={env.NEXT_PUBLIC_UMAMI_WEBSITE_SHARE_URL}
      className='flex items-center justify-center gap-2'
      aria-label={
        data
          ? `${data.visitors} current visitor${data.visitors === 1 ? '' : 's'}`
          : 'Loading'
      }
    >
      {data ? (
        <>
          <span className='relative flex size-3'>
            <span className='absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75' />
            <span className='relative inline-flex size-3 rounded-full bg-green-500' />
          </span>
          {data.visitors} current visitor{data.visitors === 1 ? '' : 's'}
        </>
      ) : (
        <Skeleton
          className='h-5 w-32 rounded-md'
          data-testid='skeleton-loader'
        />
      )}
    </Link>
  )
}

export default CurrentVisitors
