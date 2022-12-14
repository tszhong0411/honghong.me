'use client'

import clsx from 'clsx'
import React from 'react'

import { useTheme } from '@/lib/next-themes'

import Skeleton from '@/components/Skeleton'

import { colors } from '@/config/colors'

const Colors = () => {
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  return (
    <div className='flex flex-col rounded-lg border border-accent-2'>
      {mounted ? (
        colors.map((color, i) => (
          <div
            key={i}
            className={clsx(
              'flex w-full justify-between p-6 [&>div]:flex-1',
              color.className,
              {
                ['rounded-t-lg']: i === 0,
                ['rounded-b-lg']: i === colors.length - 1,
              },
              i > 4 ? 'text-hong-bg' : 'text-hong-fg'
            )}
          >
            <div className='font-bold'>{color.name}</div>
            <div className='font-code'>{color.variable}</div>
            <div className='flex justify-end uppercase'>
              {color.hex[resolvedTheme]}
            </div>
          </div>
        ))
      ) : (
        <Skeleton className='h-[60vh]' />
      )}
    </div>
  )
}

export default Colors
