'use client'

import NumberFlow, { continuous } from '@number-flow/react'
import { useTranslations } from '@tszhong0411/i18n/client'
import { BlurImage } from '@tszhong0411/ui'
import { useEffect, useRef } from 'react'

import ImageZoom from '@/components/image-zoom'
import Link from '@/components/link'
import { usePostContext } from '@/contexts/post'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import { api } from '@/trpc/react'

const Header = () => {
  const { date, title, slug } = usePostContext()
  const formattedDate = useFormattedDate(date)
  const utils = api.useUtils()
  const t = useTranslations()

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
        <h1 className='bg-linear-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl md:leading-[64px] dark:from-white dark:via-white/90 dark:to-white/70'>
          {title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>{t('blog.header.written-by')}</div>
            <Link href='https://github.com/tszhong0411' className='flex items-center gap-2'>
              <BlurImage
                src='/images/avatar.png'
                className='rounded-full'
                width={24}
                height={24}
                alt='Nelson Lai'
              />
              Nelson Lai
            </Link>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>{t('blog.header.published-on')}</div>
            <div>{formattedDate}</div>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>{t('blog.header.views')}</div>
            {viewsCountQuery.status === 'pending' ? '--' : null}
            {viewsCountQuery.status === 'error' ? t('common.error') : null}
            {viewsCountQuery.status === 'success' ? (
              <NumberFlow willChange plugins={[continuous]} value={viewsCountQuery.data.views} />
            ) : null}
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>{t('blog.header.comments')}</div>
            {commentsCountQuery.status === 'pending' ? '--' : null}
            {commentsCountQuery.status === 'error' ? t('common.error') : null}
            {commentsCountQuery.status === 'success' ? (
              <NumberFlow
                willChange
                plugins={[continuous]}
                value={commentsCountQuery.data.comments}
              />
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
