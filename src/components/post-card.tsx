'use client'

import { Skeleton } from '@tszhong0411/ui'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Link from 'next/link'

import { useFormattedDate } from '@/hooks'

import LikeCounter from './like-counter'
import Image from './mdx/image'
import ViewCounter from './view-counter'

import { BlogPostCore } from '@/types'

type PostCardProps = BlogPostCore

const PostCard = (props: PostCardProps) => {
  const { _id, slug, image, title, summary, date } = props
  const formattedDate = useFormattedDate(date, 'YYYY-MM-DD')

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

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
        className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 [--spotlight:rgba(0,0,0,0.05)] group-hover:opacity-100 dark:[--spotlight:rgba(255,255,255,0.15)]'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight),
              transparent 80%
            )
          `,
        }}
      />
      <Image
        src={`/static/images/blog/${image}`}
        width={1280}
        height={720}
        alt={title}
        rounded='rounded-lg'
      />
      <div className='flex-grow space-y-4'>
        <h2 className='text-xl font-bold'>{title}</h2>
        <div className='text-accent-5'>{summary}</div>
      </div>
      <div className='flex items-center text-sm'>
        {formattedDate ? formattedDate : <Skeleton className='h-5 w-10' />}
        &nbsp;/&nbsp;
        <LikeCounter slug={slug} />
        &nbsp;/&nbsp;
        <ViewCounter slug={slug} />
      </div>
    </Link>
  )
}

export default PostCard
