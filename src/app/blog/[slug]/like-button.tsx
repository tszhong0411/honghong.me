'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React from 'react'
import Confetti from 'react-confetti'
import { useDebounce, useWindowSize } from 'react-use'

import Skeleton from '@/components/Skeleton'

import { Likes } from '@/types'
type LikeButtonProps = {
  slug: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { slug } = props
  const [position, setPosition] = React.useState<{ x: number; y: number }>()
  const { width, height } = useWindowSize()
  const queryClient = useQueryClient()
  const { data, isLoading, isFetching } = useQuery<Likes>({
    queryKey: ['likes', slug],
    queryFn: () =>
      fetch(`/api/likes?slug=${slug}`, {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  const updatePostLikes = async (
    slug: string,
    count: number
  ): Promise<Likes> => {
    const res = await fetch(`/api/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, count }),
    })

    return res.json()
  }

  const [batchedLikes, setBatchedLikes] = React.useState(0)

  const increment = () => {
    if (!data || data.currentUserLikes >= 3) {
      return
    }

    queryClient.setQueryData(['likes', slug], (data: Likes) => ({
      likes: data.likes + 1,
      currentUserLikes: data.currentUserLikes + 1,
    }))

    setBatchedLikes(batchedLikes + 1)
  }

  useDebounce(
    async () => {
      if (batchedLikes === 0) return

      const newData = await updatePostLikes(slug, batchedLikes)

      queryClient.setQueryData(['likes', slug], newData)

      setBatchedLikes(0)
    },
    1000,
    [batchedLikes]
  )
  return (
    <div className='mt-12 flex flex-nowrap items-center justify-center gap-4'>
      <button
        className='outline-none'
        onClick={(e) => {
          if (isLoading) return
          if (data?.currentUserLikes === 2) {
            setPosition({ x: e.clientX, y: e.clientY })
          }
          if (!data || data.currentUserLikes >= 3) return

          increment()
        }}
        disabled={isFetching}
      >
        <svg viewBox='0 0 20 20' className='w-[42px]'>
          <defs>
            <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop
                offset='20%'
                stopColor='rgb(250,51,81)'
                stopOpacity={1}
              ></stop>
              <stop
                offset='80%'
                stopColor='rgb(255,121,44)'
                stopOpacity={1}
              ></stop>
            </linearGradient>
            <mask id='mask' mask-type='alpha' maskUnits='userSpaceOnUse'>
              <path d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'></path>
            </mask>
          </defs>
          <g mask='url(#mask)'>
            <rect
              width='20'
              height='20'
              className='fill-[#c4c1c1] dark:fill-[#4b5563]'
            ></rect>
            <motion.rect
              fill='url(#gradient)'
              width='16'
              height='16'
              x='2'
              y='2'
              animate={String(data?.currentUserLikes)}
              variants={{
                '0': { translateY: 17 },
                '1': { translateY: 12 },
                '2': { translateY: 8 },
                '3': { translateY: 1 },
              }}
              initial='0'
            ></motion.rect>
          </g>
        </svg>
        {!!position && (
          <Confetti
            style={{
              position: 'fixed',
              inset: 0,
            }}
            recycle={false}
            width={width}
            height={height}
            confettiSource={{
              x: position.x,
              y: position.y,
              h: 5,
              w: 5,
            }}
            onConfettiComplete={() => {
              setPosition(undefined)
            }}
          />
        )}
      </button>
      {!isLoading ? (
        <div className='text-[22px] font-bold'>{data?.likes}</div>
      ) : (
        <Skeleton className='h-[25px] w-[50px]' />
      )}
    </div>
  )
}

export default LikeButton
