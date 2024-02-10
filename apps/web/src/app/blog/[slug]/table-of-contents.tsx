'use client'

import { cn } from '@tszhong0411/utils'
import * as React from 'react'

import useScrollspy from '@/hooks/use-scrollspy'
import { type Heading } from '@/utils/get-headings'

type TableOfContentsProps = {
  headings: Heading[]
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { headings } = props
  const activeId = useScrollspy(
    headings.map((heading) => heading.id),
    { rootMargin: '0% 0% -80% 0%' }
  )

  return (
    <div className='hidden lg:block'>
      <div className='mb-4 pl-4'>On this page</div>
      <div>
        {headings.map((heading) => {
          const { id, level, title } = heading

          return (
            <a
              key={id}
              href={`#${id}`}
              className={cn(
                'block py-2.5 pr-2.5 text-sm leading-[1.2] text-muted-foreground transition-all duration-200 hover:text-foreground',
                id === activeId && 'text-foreground'
              )}
              style={{
                paddingLeft: (level - 1) * 16
              }}
            >
              {title}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default TableOfContents
