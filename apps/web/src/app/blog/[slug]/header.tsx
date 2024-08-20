'use client'

import { BlurImage, Link } from '@tszhong0411/ui'
import { useEffect, useRef } from 'react'

import ImageZoom from '@/components/image-zoom'
import { usePostContext } from '@/contexts/post'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import { api } from '@/trpc/react'

const Header = () => {
  const { date, title, slug } = usePostContext()
  const formattedDate = useFormattedDate(date, {
    format: 'LL',
    loading: '--'
  })
  const utils = api.useUtils()

  const incrementMutation = api.views.increment.useMutation({
    onSettled: () => utils.views.get.invalidate()
  })

  const viewsCountQuery = api.views.get.useQuery({
    slug
  })

  const commentsCountQuery = api.comments.getTotalCommentsCount.useQuery({
    slug
  })

  const incremented = useRef(false)

  useEffect(() => {
    if (!incremented.current) {
      incrementMutation.mutate({ slug })
      incremented.current = true
    }
  }, [incrementMutation, slug])

  return (
    <div className='space-y-16 py-16'>
      <div className='space-y-16 sm:px-8'>
        <h1 className='font-title bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl md:leading-[64px] dark:from-white dark:via-white/90 dark:to-white/70'>
          {title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Written by</div>
            <Link href='https://github.com/tszhong0411' className='flex items-center gap-2'>
              <BlurImage
                src='/images/avatar.png'
                className='rounded-full'
                width={24}
                height={24}
                alt='Hong'
              />
              Hong
            </Link>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Published on</div>
            <div>{formattedDate}</div>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Views</div>
            {viewsCountQuery.status === 'pending' ? '--' : null}
            {viewsCountQuery.status === 'error' ? 'Error' : null}
            {viewsCountQuery.status === 'success' ? <div>{viewsCountQuery.data.views}</div> : null}
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Comments</div>
            {commentsCountQuery.status === 'pending' ? '--' : null}
            {commentsCountQuery.status === 'error' ? 'Error' : null}
            {commentsCountQuery.status === 'success' ? (
              <div>{commentsCountQuery.data.comments}</div>
            ) : null}
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: `/images/blog/${slug}/cover.png`,
          alt: title
        }}
      >
        <BlurImage
          src={`/images/blog/${slug}/cover.png`}
          className='rounded-lg'
          width={1200}
          height={630}
          lazy={false}
          alt={title}
        />
      </ImageZoom>
    </div>
  )
}

export default Header
