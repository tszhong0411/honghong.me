import { cn } from '@tszhong0411/utils'
import React from 'react'

type MarqueeProps = {
  children: React.ReactNode
  speed?: number
  direction?: 'vertical' | 'horizontal'
  pauseOnHover?: boolean
  reverse?: boolean
  fade?: boolean
  inset?: number
  className?: string
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>((props, ref) => {
  const {
    children,
    speed = 20,
    direction = 'horizontal',
    pauseOnHover = false,
    reverse = false,
    fade = false,
    inset = 2,
    className
  } = props
  const items = React.Children.toArray(children)

  return (
    <div
      className={cn('overflow-hidden', className)}
      data-testid='marquee'
      data-marquee
      data-direction={direction}
      data-reverse={reverse}
      ref={ref}
      style={
        {
          maskImage: fade
            ? `linear-gradient(${
                direction === 'horizontal' ? 'to right' : 'to bottom'
              }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
            : undefined,
          WebkitMaskImage: fade
            ? `linear-gradient(${
                direction === 'horizontal' ? 'to right' : 'to bottom'
              }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
            : undefined,
          '--speed': speed,
          '--count': items.length,
          '--inset': inset
        } as React.CSSProperties
      }
    >
      <ul className='group flex'>
        {items.map((item, i) => (
          <li
            key={i}
            style={
              {
                '--index': i
              } as React.CSSProperties
            }
            className={cn(
              pauseOnHover && 'group-hover:[animation-play-state:paused]'
            )}
            data-testid={`marquee-child-${i + 1}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
})

Marquee.displayName = 'Marquee'

export { Marquee }
