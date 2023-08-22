'use client'

import { Skeleton } from '@tszhong0411/ui'
import dayjs from 'dayjs'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import Image from './mdx/image'

import { BlogPostCore, Likes, Views } from '@/types'

type PostCardProps = BlogPostCore

const PostCard = (props: PostCardProps) => {
  const { _id, slug, title, summary, date } = props
  const [formattedDate, setFormattedDate] = React.useState('')
  const { data: viewsData, isLoading: viewsIsLoading } = useSWR<Views>(
    `/api/views?slug=${slug}`,
    fetcher,
  )
  const { data: likesData, isLoading: likesIsLoading } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher,
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format('MMMM DD, YYYY'))
  }, [date])

  return (
    <Link
      key={_id}
      href={`/blog/${slug}`}
      className='group relative flex flex-col space-y-3 rounded-2xl border border-accent-2 p-6'
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()

        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
    >
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <Image
        src={`/images/blog/${slug}/cover.png`}
        className='rounded-lg'
        width={1200}
        height={630}
        alt={title}
      />
      <div className='flex-grow space-y-4'>
        <h2 className='text-xl font-bold'>{title}</h2>
        <div className='text-accent-5'>{summary}</div>
      </div>
      <div className='flex items-center gap-2 text-sm'>
        {formattedDate ? formattedDate : <Skeleton className='h-5 w-10' />}
        <div>&middot;</div>
        {likesIsLoading ? (
          <Skeleton className='h-5 w-10 rounded-md' />
        ) : (
          <div>{likesData?.likes} likes</div>
        )}
        <div>&middot;</div>
        {viewsIsLoading ? (
          <Skeleton className='h-5 w-10 rounded-md' />
        ) : (
          <div>{viewsData?.views} views</div>
        )}
      </div>
    </Link>
  )
}

export default PostCard
