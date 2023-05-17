'use client'

import { IconList } from '@tabler/icons-react'
import { cx } from '@tszhong0411/utils'
import React from 'react'

import { useHeadings, useScrollspy } from '@/hooks'

const TableOfContents = () => {
  const headings = useHeadings()
  const activeId = useScrollspy(
    headings.map((heading) => heading.id),
    { rootMargin: '0% 0% -55% 0%' }
  )

  return (
    <div className='hidden lg:block'>
      <div className='mb-4 flex items-center gap-4'>
        <IconList size={18} />
        <div>Table of contents</div>
      </div>
      <div>
        {headings.map((heading) => {
          const { id, level, title } = heading

          return (
            <a
              key={id}
              href={`#${id}`}
              className={cx(
                'block border-l-2 border-accent-2 pb-[10px] pr-[10px] pt-[10px] text-sm leading-[1.2] text-accent-5 transition-all duration-300 hover:text-accent-fg',
                {
                  ['border-accent-fg text-accent-fg']: id === activeId,
                }
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
