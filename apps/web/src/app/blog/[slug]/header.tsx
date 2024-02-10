'use client'

import { Link } from '@tszhong0411/ui'
import { dayjs } from '@tszhong0411/utils'
import * as React from 'react'
import useSWR from 'swr'

import ImageZoom from '@/components/image-zoom'
import Image from '@/components/mdx/image'
import fetcher from '@/lib/fetcher'
import { type Comments, type Views } from '@/types'

type HeaderProps = {
  date: string
  title: string
  slug: string
}

const Header = (props: HeaderProps) => {
  const { date, title, slug } = props
  const [formattedDate, setFormattedDate] = React.useState('')
  const { data: viewsData, isLoading: viewsIsLoading } = useSWR<Views>(
    `/api/views?slug=${slug}`,
    fetcher
  )
  const { data: commentsData, isLoading: commentsIsLoading } = useSWR<Comments>(
    `/api/comments?slug=${slug}`,
    fetcher
  )

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format('LL'))
  }, [date])

  React.useEffect(() => {
    const increment = async () => {
      await fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({
          slug
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    increment()
  }, [slug])

  return (
    <div className='space-y-16 py-16'>
      <div className='space-y-16 sm:px-8'>
        <h1 className='bg-gradient-to-b from-white via-white/90 to-white/70 to-90% bg-clip-text text-center font-title text-4xl font-bold text-transparent md:text-5xl md:leading-[64px]'>
          {title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Written by</div>
            <Link
              href='https://github.com/tszhong0411'
              className='flex items-center gap-2'
            >
              <Image
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
            <div>{formattedDate || '--'}</div>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Views</div>
            {viewsIsLoading ? '--' : <div>{viewsData?.views}</div>}
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Comments</div>
            {commentsIsLoading ? '--' : <div>{commentsData?.comments}</div>}
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: `/images/blog/${slug}/cover.png`,
          alt: title
        }}
      >
        <Image
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
