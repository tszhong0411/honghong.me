'use client'

import { BlurImage, buttonVariants, Link } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRightIcon, PencilIcon } from 'lucide-react'
import type { BlogPost } from 'mdx/generated'
import pluralize from 'pluralize'
import { useRef } from 'react'

import { useFormattedDate } from '@/hooks/use-formatted-date'
import { api } from '@/trpc/react'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

type LatestArticlesProps = {
  posts: BlogPost[]
}

const LatestArticles = (props: LatestArticlesProps) => {
  const { posts } = props
  const projectsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5
      }}
      className='my-24'
    >
      <motion.h2
        className='font-title text-center text-3xl font-bold sm:text-4xl'
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        Latest Articles
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        {posts.map((post) => (
          <Card key={post.slug} post={post} />
        ))}
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/blog'
          className={cn(
            buttonVariants({
              variant: 'outline'
            }),
            'rounded-xl'
          )}
        >
          See all articles
        </Link>
      </div>
    </motion.div>
  )
}

type CardProps = {
  post: BlogPost
}

const Card = (props: CardProps) => {
  const { post } = props
  const { slug, title, summary, date } = post
  const formattedDate = useFormattedDate(date, {
    format: 'LL',
    loading: '--'
  })

  const viewsQuery = api.views.get.useQuery({
    slug
  })

  const likesQuery = api.likes.get.useQuery({
    slug
  })

  return (
    <Link
      href={`/blog/${slug}`}
      className='shadow-feature-card dark:shadow-feature-card-dark group relative rounded-xl p-2'
    >
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <PencilIcon className='size-[18px]' />
          <h2 className='font-light'>Blog</h2>
        </div>
        <ArrowUpRightIcon className='size-[18px] opacity-0 transition-opacity group-hover:opacity-100' />
      </div>
      <BlurImage
        width={1200}
        height={630}
        src={`/images/blog/${slug}/cover.png`}
        alt={title}
        className='rounded-lg'
      />
      <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
        {formattedDate}
        <div className='flex gap-2'>
          {likesQuery.status === 'pending' ? '--' : null}
          {likesQuery.status === 'error' ? 'Error' : null}
          {likesQuery.status === 'success' ? (
            <div>{pluralize('like', likesQuery.data.likes, true)}</div>
          ) : null}
          <div>&middot;</div>
          {viewsQuery.status === 'pending' ? '--' : null}
          {viewsQuery.status === 'error' ? 'Error' : null}
          {viewsQuery.status === 'success' ? (
            <div>{pluralize('view', viewsQuery.data.views, true)}</div>
          ) : null}
        </div>
      </div>
      <div className='flex flex-col px-2 py-4 transition-transform ease-out group-hover:translate-x-0.5'>
        <h3 className='font-title text-2xl font-bold'>{title}</h3>
        <p className='text-muted-foreground mt-2'>{summary}</p>
      </div>
    </Link>
  )
}

export default LatestArticles
