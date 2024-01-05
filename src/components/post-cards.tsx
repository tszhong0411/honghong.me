'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import useSWR from 'swr'

import useGlowPointer from '@/hooks/use-glow-pointer'
import fetcher from '@/lib/fetcher'
import { type BlogPostCore, type Likes, type Views } from '@/types'

import GlowCard from './glow-card'
import Image from './mdx/image'

type PostCardsProps = {
  posts: BlogPostCore[]
}
type PostCardProps = BlogPostCore

const PostCards = (props: PostCardsProps) => {
  const { posts } = props
  useGlowPointer()

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </div>
  )
}

const PostCard = (props: PostCardProps) => {
  const { slug, title, summary, date } = props
  const [formattedDate, setFormattedDate] = React.useState('')
  const { data: viewsData, isLoading: viewsIsLoading } = useSWR<Views>(
    `/api/views?slug=${slug}`,
    fetcher
  )
  const { data: likesData, isLoading: likesIsLoading } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher
  )

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format('MMMM DD, YYYY'))
  }, [date])

  return (
    <GlowCard asChild>
      <Link
        href={`/blog/${slug}`}
        className='group flex flex-col space-y-3 rounded-xl p-6'
      >
        <Image
          src={`/images/blog/${slug}/cover.png`}
          className='rounded-xl'
          width={1200}
          height={630}
          imageClassName='transition-transform duration-200 group-hover:scale-105'
          alt={title}
        />
        <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
          {formattedDate || '--'}
          <div className='flex gap-2'>
            {likesIsLoading ? '--' : <div>{likesData?.likes} likes</div>}
            <div>&middot;</div>
            {viewsIsLoading ? '--' : <div>{viewsData?.views} views</div>}
          </div>
        </div>
        <div className='flex flex-col px-2 py-4'>
          <h3 className='font-calcom text-2xl font-bold'>{title}</h3>
          <p className='mt-2 text-muted-foreground'>{summary}</p>
        </div>
      </Link>
    </GlowCard>
  )
}

export default PostCards
