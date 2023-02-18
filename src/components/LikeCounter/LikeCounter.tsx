'use client'

import React from 'react'

import { usePostLikes } from '@/hooks'

import Skeleton from '../Skeleton'

type LikeCounterProps = {
  slug: string
}

const LikeCounter = (props: LikeCounterProps) => {
  const { slug } = props

  const { likes, isLoading, isError } = usePostLikes(slug)

  return (
    <>
      {isLoading || isError ? (
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${likes} 個讚`}</div>
      )}
    </>
  )
}

export default LikeCounter
