'use client'

import { Link } from '@tszhong0411/ui'

import { usePostContext } from '@/contexts/post'
import { useFormattedDate } from '@/hooks/use-formatted-date'

const editURL = (slug: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/apps/web/src/content/blog/${slug}.mdx?plain=1`

const Footer = () => {
  const { slug, modifiedTime } = usePostContext()

  const formattedDate = useFormattedDate(modifiedTime, {
    format: 'DD/MM/YYYY',
    loading: '--/--/----'
  })

  return (
    <div className='my-8 flex w-full items-center justify-between py-4 text-sm'>
      <Link href={editURL(slug)} variant='muted'>
        Edit on GitHub
      </Link>
      <div className='text-muted-foreground'>Last updated: {formattedDate}</div>
    </div>
  )
}

export default Footer
