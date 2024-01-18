import React from 'react'

import cn from '@/utils/cn'
import range from '@/utils/range'

type MarqueeProps = {
  children: React.ReactNode
  direction?: 'left' | 'up'
  pauseOnHover?: boolean
  reverse?: boolean
  fade?: boolean
  className?: string
}

const Marquee = (props: MarqueeProps) => {
  const {
    children,
    direction = 'left',
    pauseOnHover = false,
    reverse = false,
    fade = false,
    className
  } = props

  return (
    <div
      className={cn(
        'group flex gap-4 overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className
      )}
      data-testid='marquee'
      style={{
        maskImage: fade
          ? `linear-gradient(${
              direction === 'left' ? 'to right' : 'to bottom'
            }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fade
          ? `linear-gradient(${
              direction === 'left' ? 'to right' : 'to bottom'
            }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined
      }}
    >
      {range(0, 2).map((i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 justify-around gap-4 [--gap:1rem]',
            direction === 'left'
              ? 'animate-marquee-left flex-row'
              : 'animate-marquee-up flex-col',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && 'direction-reverse'
          )}
          data-testid={`marquee-child-${i + 1}`}
        >
          {children}
        </div>
      ))}
    </div>
  )
}

export { Marquee }
