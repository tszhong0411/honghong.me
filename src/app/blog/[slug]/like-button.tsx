'use client'

/**
 * (Styling) Inspired by https://framer.university/resources/like-button-component
 */
import { motion } from 'framer-motion'
import React from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { useDebouncedCallback } from 'use-debounce'

import { Separator } from '@/components/ui/separator'
import fetcher from '@/lib/fetcher'
import { type Likes } from '@/types'

export type LikeButtonProps = {
  slug: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { slug } = props
  const [cacheCount, setCacheCount] = React.useState(0)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const { data, isLoading, mutate } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher
  )

  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement
    const boundingBox = buttonRef.current?.getBoundingClientRect?.()

    const targetY = boundingBox?.y ?? 0
    const targetX = boundingBox?.x ?? 0
    const targetWidth = boundingBox?.width ?? 0

    const targetCenterX = targetX + targetWidth / 2
    const confetti = (await import('canvas-confetti')).default

    await confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 100,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth
      },
      shapes: [confetti.shapeFromText({ text: '❤️', scalar: 2 })]
    })
  }

  const onLikeSaving = useDebouncedCallback(async (value: number) => {
    try {
      const res = await fetch('/api/likes', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ slug, count: value })
      })

      const newData = (await res.json()) as Likes

      await mutate(newData)
    } catch {
      toast.error('Unable to like this post. Please try again.')
    } finally {
      setCacheCount(0)
    }
  }, 1000)

  const handleLike = () => {
    if (isLoading || !data || data.currentUserLikes + cacheCount >= 3) return

    const value = cacheCount === 3 ? cacheCount : cacheCount + 1
    setCacheCount(value)

    if (data.currentUserLikes + cacheCount === 2) {
      handleConfetti()
    }

    return onLikeSaving(value)
  }

  return (
    <div className='mt-12 flex justify-center'>
      <button
        ref={buttonRef}
        className='flex items-center gap-3 rounded-xl bg-gradient-to-b from-[#1c1c1d] to-[#141414] px-4 py-2 text-lg shadow-[rgb(255,255,255,0.02)1px_1px_0px_0px_inset,rgb(255,255,255,0.02)-1px_-1px_0px_0px_inset,rgb(255,255,255,0.02)1px_-1px_0px_0px_inset,rgb(255,255,255,0.02)-1px_1px_0px_0px_inset,rgb(255,255,255,0.05)0px_1px_0px_0px_inset,rgb(0,0,0,0.5)0px_4px_8px_0px,rgb(0,0,0,0.17)0px_2px_4px_0px]'
        type='button'
        onClick={handleLike}
        aria-label='Like this post'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='28'
          height='28'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='#ef4444'
          className='relative overflow-hidden'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <defs>
            <clipPath id='clip-path'>
              <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
            </clipPath>
          </defs>
          <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
          <g clipPath='url(#clip-path)'>
            <motion.rect
              x='0'
              y='0'
              width='24'
              height='24'
              fill='#ef4444'
              initial={{
                y: '100%'
              }}
              animate={{
                y: data ? `${100 - (data.likes + cacheCount) * 33}%` : '100%'
              }}
            />
          </g>
        </svg>
        Like{data && data.likes + cacheCount === 1 ? '' : 's'}
        <Separator orientation='vertical' />
        {isLoading || !data ? (
          <div> -- </div>
        ) : (
          <div>{data.likes + cacheCount}</div>
        )}
      </button>
    </div>
  )
}

export default LikeButton
