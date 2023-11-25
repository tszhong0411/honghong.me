'use client'

import { IconHeart } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React from 'react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import { useDebouncedCallback } from 'use-debounce'

import fetcher from '@/lib/fetcher'
import { type Likes } from '@/types'
import cn from '@/utils/cn'

export type LikeButtonProps = {
  slug: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { slug } = props
  const [isBreathing, setIsBreathing] = React.useState(false)
  const [scale, setScale] = React.useState(1)
  const [cacheCount, setCacheCount] = React.useState(0)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const { data, isLoading, mutate } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher
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

    await confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 100,
      origin: {
        y: targetY / clientHeight,
        x: targetCenterX / clientWidth
      }
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
      toast.error('Something went wrong')
    } finally {
      setCacheCount(0)
    }
  }, 1000)

  const handleLike = () => {
    if (isLoading || !data || data.currentUserLikes + cacheCount >= 3) return

    const value = cacheCount === 3 ? cacheCount : cacheCount + 1
    setCacheCount(value)

    if (data.currentUserLikes + cacheCount === 2) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      handleConfetti()
    }

    return onLikeSaving(value)
  }

  return (
    <div className='mt-12 flex justify-center'>
      <button
        ref={buttonRef}
        className={cn([
          'group relative h-12 w-24 rounded-lg bg-transparent',
          'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-[#7928ca] before:to-[#ff0080] before:content-[""]'
        ])}
        type='button'
        onClick={handleLike}
        aria-label='Like this post'
      >
        <motion.span
          className='absolute inset-0 rounded-lg bg-gradient-to-br from-[#7928ca] to-[#ff0080] blur-xl'
          animate={{ scale: isBreathing ? scale : 1 }}
          transition={{ duration: 1, ease: 'linear' }}
        />
        <span
          className={cn([
            'absolute inset-0.5 z-10 flex items-center justify-center gap-2 rounded-md bg-background text-lg font-bold transition-[background-color] duration-150',
            'group-hover:bg-transparent group-hover:text-background dark:group-hover:text-foreground'
          ])}
        >
          <IconHeart
            className={cn(
              'group-hover:fill-background dark:group-hover:fill-foreground',
              data &&
                data.currentUserLikes + cacheCount === 3 &&
                'fill-foreground'
            )}
            size={24}
          />
          {isLoading || !data ? (
            <div> -- </div>
          ) : (
            <div>{data.likes + cacheCount}</div>
          )}
        </span>
      </button>
    </div>
  )
}

export default LikeButton
