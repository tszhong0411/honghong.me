'use client'

import { motion } from 'framer-motion'
import React from 'react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

import { usePostLikes } from '@/hooks'

import Skeleton from '../../../../../components/Skeleton'
type LikeButtonProps = {
  slug: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { slug } = props

  const { currentUserLikes, likes, isLoading, increment } = usePostLikes(slug)
  const [position, setPosition] = React.useState<{ x: number; y: number }>()
  const { width, height } = useWindowSize()

  return (
    <div className='mt-12 flex flex-nowrap items-center justify-center gap-4'>
      <button
        className='outline-none'
        onClick={(e) => {
          if (isLoading) return
          if (currentUserLikes === 2) {
            setPosition({ x: e.clientX, y: e.clientY })
          }

          increment()
        }}
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
              animate={String(currentUserLikes)}
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
        <div className='text-[22px] font-bold'>{likes}</div>
      ) : (
        <Skeleton className='h-[25px] w-[50px]' />
      )}
    </div>
  )
}

export default LikeButton
