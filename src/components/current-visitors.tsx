'use client'

import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Skeleton } from '@/components/ui'

import { AnalyticsData } from '@/types'

const CurrentVisitors = () => {
  const { data } = useSWR<AnalyticsData>('/api/analytics', fetcher, {
    refreshInterval: 30000, // refresh every 30 seconds
  })

  return (
    <a
      href={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_SHARE_URL}
      className='flex items-center justify-center gap-2'
      rel='noopener noreferrer'
      target='_blank'
    >
      {data ? (
        <>
          <span className='relative flex h-3 w-3'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
            <span className='relative inline-flex h-3 w-3 rounded-full bg-green-500'></span>
          </span>
          {data.visitors} current visitors
        </>
      ) : (
        <Skeleton className='h-5 w-32 rounded-md' />
      )}
    </a>
  )
}

export default CurrentVisitors
