'use client'

import { cx } from '@tszhong0411/utils'
import React from 'react'

import { useScrollspy } from '@/hooks'

import { Heading } from '@/utils/get-headings'

type TableOfContentsProps = {
  headings: Heading[]
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { headings } = props
  const activeId = useScrollspy(
    headings.map((heading) => heading.id),
    { rootMargin: '0% 0% -80% 0%' },
  )

  return (
    <div className='hidden lg:block'>
      <div className='mb-4 pl-4'>Table of contents</div>
      <div>
        {headings.map((heading) => {
          const { id, level, title } = heading

          return (
            <a
              key={id}
              href={`#${id}`}
              className={cx(
                'block pb-[10px] pr-[10px] pt-[10px] text-sm leading-[1.2] text-accent-5 transition-all duration-300 hover:text-accent-fg',
                {
                  ['text-accent-fg']: id === activeId,
                },
              )}
              style={{
                paddingLeft: (level - 1) * 16,
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
