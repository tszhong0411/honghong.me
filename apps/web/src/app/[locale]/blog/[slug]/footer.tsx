'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { linkVariants } from '@tszhong0411/ui'

import Link from '@/components/link'
import { usePostContext } from '@/contexts/post'
import { useFormattedDate } from '@/hooks/use-formatted-date'

const editURL = (slug: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/apps/web/src/content/blog/${slug}.mdx?plain=1`

const Footer = () => {
  const { slug, modifiedTime } = usePostContext()
  const t = useTranslations('blog.footer')

  const formattedDate = useFormattedDate(modifiedTime)

  return (
    <div className='my-8 flex w-full items-center justify-between py-4 text-sm'>
      <Link href={editURL(slug)} className={linkVariants({ variant: 'muted' })}>
        {t('edit-on-github')}
      </Link>
      <div className='text-muted-foreground'>{t('last-updated', { date: formattedDate })}</div>
    </div>
  )
}

export default Footer
