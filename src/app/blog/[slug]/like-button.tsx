'use client'

import { IconHeart } from '@tabler/icons-react'
import { cx } from '@tszhong0411/utils'
import { motion } from 'framer-motion'
import party from 'party-js'
import React from 'react'
import { useDebounce } from 'react-use'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Likes } from '@/types'
type LikeButtonProps = {
  slug: string
}

const LikeButton = (props: LikeButtonProps) => {
  const { slug } = props
  const [isBreathing, setIsBreathing] = React.useState(false)
  const [scale, setScale] = React.useState(1)

  const { data, isLoading, mutate } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher
  )

  const updatePostLikes = async (
    slug: string,
    count: number
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
      false
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
    [batchedLikes]
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

  return (
    <div className='mt-12 flex justify-center'>
      <button
        className={cx([
          'group relative h-12 w-24 rounded-lg bg-transparent',
          'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-[#7928ca] before:to-[#ff0080] before:content-[""]',
        ])}
        type='button'
        onClick={(e) => {
          if (isLoading) return
          if (data?.currentUserLikes === 2) {
            party.confetti(e.currentTarget, {
              count: party.variation.range(30, 40),
            })
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
          className={cx([
            'absolute inset-0.5 z-10 flex items-center justify-center gap-2 rounded-[7px] bg-accent-bg text-lg font-bold transition-[background-color] duration-150',
            'group-hover:bg-transparent group-hover:text-accent-bg dark:group-hover:text-accent-fg',
          ])}
        >
          <IconHeart
            className={cx(
              'group-hover:fill-accent-bg dark:group-hover:fill-accent-fg',
              data?.currentUserLikes === 3 && 'fill-accent-fg'
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
