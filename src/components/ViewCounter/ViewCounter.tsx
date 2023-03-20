'use client'

import React from 'react'

import { usePostViews } from '@/hooks'

import Skeleton from '@/components/Skeleton'

type ViewCounterProps = {
  slug: string
  type?: 'GET' | 'POST'
}

const ViewCounter = (props: ViewCounterProps) => {
  const { slug, type = 'GET' } = props

  const {
    views,
    isLoading,
    isError,
    increment: incrementViews,
  } = usePostViews(slug)

  React.useEffect(() => {
    if (slug && type === 'POST') {
      incrementViews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, incrementViews])

  return (
    <>
      {isLoading || isError ? (
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${views} 次瀏覽`}</div>
      )}
    </>
  )
}

export default ViewCounter
