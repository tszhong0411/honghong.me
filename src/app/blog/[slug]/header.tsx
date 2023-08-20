'use client'

import { Skeleton } from '@tszhong0411/ui'
import dayjs from 'dayjs'
import React from 'react'

import Image from '@/components/mdx/image'
import ViewCounter from '@/components/view-counter'

import CommentCounter from './comment-counter'

type HeaderProps = {
  date: string
  title: string
  slug: string
}

const Header = (props: HeaderProps) => {
  const { date, title, slug } = props
  const [formattedDate, setFormattedDate] = React.useState('')

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format('MMMM DD, YYYY'))
  }, [date])

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const increment = async () => {
        await fetch('/api/views', {
          method: 'POST',
          body: JSON.stringify({
            slug,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }

      increment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='space-y-12 py-12'>
      <div className='space-y-12 px-8'>
        <h1 className='text-center font-calcom text-4xl font-bold'>{title}</h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-accent-5'>Written by</div>
            <a
              href='https://github.com/tszhong0411'
              rel='noopener noreferrer'
              target='_blank'
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
            </a>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-accent-5'>Published on</div>
            <div>
              {formattedDate ? (
                formattedDate
              ) : (
                <Skeleton className='h-6 w-32 rounded-md' />
              )}
            </div>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-accent-5'>Views</div>
            <ViewCounter slug={slug} />
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-accent-5'>Comments</div>
            <CommentCounter />
          </div>
        </div>
      </div>
      <Image
        src={`/images/blog/${slug}/cover.png`}
        className='rounded-lg'
        width={1200}
        height={630}
        alt={title}
      />
    </div>
  )
}

export default Header
