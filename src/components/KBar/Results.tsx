'use client'

import clsx from 'clsx'
import { KBarResults, useMatches } from 'kbar'
import React from 'react'

const Results = () => {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className='select-none px-4 pt-4 pb-2 text-[10px] uppercase tracking-[1px]'>
            {item}
          </div>
        ) : (
          <div
            className={clsx(
              'mx-3 flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 transition-colors',
              active ? 'bg-accent-2' : 'bg-transparent'
            )}
          >
            <div className='flex items-center'>
              {item.icon && <div className='mr-4'>{item.icon}</div>}
              <span className='text-md'>{item.name}</span>
            </div>
          </div>
        )
      }
    />
  )
}

export default Results
