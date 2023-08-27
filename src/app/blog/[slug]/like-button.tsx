'use client'

import { IconHeart } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React from 'react'
import { useDebounce } from 'react-use'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { cn } from '@/utils/cn'

import { Likes } from '@/types'

type LikeButtonProps = {
  slug: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { slug } = props
  const [isBreathing, setIsBreathing] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const { data, isLoading, mutate } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher,
  )

  const updatePostLikes = async (
    slug: string,
    count: number,
  ): Promise<Likes> => {
    const res = await fetch('/api/likes', {
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

    mutate(
      {
        likes: data.likes + 1,
        currentUserLikes: data.currentUserLikes + 1,
      },
      false,
    )

    setBatchedLikes(batchedLikes + 1)
  }

  useDebounce(
    () => {
      if (batchedLikes === 0) return

      mutate(updatePostLikes(slug, batchedLikes))

      setBatchedLikes(0)
    },
    1000,
    [batchedLikes],
  )

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathing(true)
      setScale(1.2)
      setTimeout(() => {
        setIsBreathing(false)
        setScale(1)
      }, 1500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleConfetti = async () => {
    const { clientWidth, clientHeight } = document.documentElement
    const boundingBox = buttonRef.current?.getBoundingClientRect?.()

    const targetY = boundingBox?.y ?? 0
    const targetX = boundingBox?.x ?? 0
    const targetWidth = boundingBox?.width ?? 0

    const targetCenterX = targetX + targetWidth / 2
    const confetti = (await import('canvas-confetti')).default

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 100,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth,
      },
    })
  }

  return (
    <div className='mt-12 flex justify-center'>
      <button
        ref={buttonRef}
        className={cn([
          'group relative h-12 w-24 rounded-lg bg-transparent',
          'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-[#7928ca] before:to-[#ff0080] before:content-[""]',
        ])}
        type='button'
        onClick={() => {
          if (isLoading) return
          if (data?.currentUserLikes === 2) {
            handleConfetti()
          }
          if (!data || data.currentUserLikes >= 3) return

          increment()
        }}
        title='Like this post'
      >
        <motion.span
          className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#7928ca] to-[#ff0080] blur-xl'
          animate={{ scale: isBreathing ? scale : 1 }}
          transition={{ duration: 1, ease: 'linear' }}
        />
        <span
          className={cn([
            'absolute inset-0.5 z-10 flex items-center justify-center gap-2 rounded-[7px] bg-background text-lg font-bold transition-[background-color] duration-150',
            'group-hover:bg-transparent group-hover:text-foreground',
          ])}
        >
          <IconHeart
            className={cn(
              'group-hover:fill-foreground',
              data?.currentUserLikes === 3 && 'fill-foreground',
            )}
            size={20}
          />
          {!isLoading ? <div>{data?.likes}</div> : <div> -- </div>}
        </span>
      </button>
    </div>
  )
}

export default LikeButton
