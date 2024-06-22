'use client'

import { type TOC } from '@tszhong0411/mdx'
import { Link } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'

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

  return (
    <div className='hidden lg:block'>
      <div className='mb-4 pl-4'>On this page</div>
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
