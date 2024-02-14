'use client'

import { Link } from '@tszhong0411/ui'
import * as React from 'react'
import useSWR from 'swr'

import { useFormattedDate } from '@/hooks/use-formatted-date'
import fetcher from '@/lib/fetcher'
import { type BlogMetadata } from '@/lib/mdx'
import { type Likes, type Views } from '@/types'

import Image from './mdx/image'

type PostCardsProps = {
  posts: BlogMetadata[]
}
type PostCardProps = BlogMetadata

const PostCards = (props: PostCardsProps) => {
  const { posts } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {posts.map((post) => (
        <PostCard key={post.slug} {...post} />
      ))}
    </div>
  )
}

const PostCard = (props: PostCardProps) => {
  const { slug, title, summary, date } = props
  const formattedDate = useFormattedDate(date, {
    format: 'LL',
    loading: '--'
  })
  const { data: viewsData, isLoading: viewsIsLoading } = useSWR<Views>(
    `/api/views?slug=${slug}`,
    fetcher
  )
  const { data: likesData, isLoading: likesIsLoading } = useSWR<Likes>(
    `/api/likes?slug=${slug}`,
    fetcher
  )

  return (
    <Link
      href={`/blog/${slug}`}
      className='group rounded-xl bg-background-lighter/60 px-2 py-4 shadow-card-border transition-colors duration-200 hover:bg-background-lighter'
    >
      <Image
        src={`/images/blog/${slug}/cover.png`}
        className='rounded-lg'
        width={1200}
        height={630}
        imageClassName='transition-transform duration-200 group-hover:scale-105'
        alt={title}
      />
      <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
        {formattedDate}
        <div className='flex gap-2'>
          {likesIsLoading ? '--' : <div>{likesData?.likes} likes</div>}
          <div>&middot;</div>
          {viewsIsLoading ? '--' : <div>{viewsData?.views} views</div>}
        </div>
      </div>
      <div className='flex flex-col px-2 py-4'>
        <h3 className='font-title text-2xl font-bold'>{title}</h3>
        <p className='mt-2 text-muted-foreground'>{summary}</p>
      </div>
    </Link>
  )
}

export default PostCards
