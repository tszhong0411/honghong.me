'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { type TOC } from '@tszhong0411/mdx'
import { cn } from '@tszhong0411/utils'

import Link from '@/components/link'
import { useScrollspy } from '@/hooks/use-scrollspy'

type TableOfContentsProps = {
  toc: TOC[]
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc } = props
  const activeId = useScrollspy(
    toc.map((item) => item.url),
    { rootMargin: '0% 0% -80% 0%' }
  )
  const t = useTranslations('blog')

  return (
    <div className='hidden lg:block'>
      <div className='mb-4 pl-4'>{t('on-this-page')}</div>
      <div>
        {toc.map((item) => {
          const { title, url, depth } = item

          return (
            <Link
              key={url}
              href={`#${url}`}
              className={cn(
                'text-muted-foreground hover:text-foreground block py-2.5 pr-2.5 text-sm leading-[1.2] transition-colors',
                url === activeId && 'text-foreground'
              )}
              style={{
                paddingLeft: (depth - 1) * 16
              }}
            >
              {title}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TableOfContents
