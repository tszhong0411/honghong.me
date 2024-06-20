import { cn, range } from '@tszhong0411/utils'

type MarqueeProps = {
  children: React.ReactNode
  gap?: string
  direction?: 'left' | 'up'
  pauseOnHover?: boolean
  reverse?: boolean
  fade?: boolean
  className?: string
}

export const Marquee = (props: MarqueeProps) => {
  const {
    children,
    gap = '1rem',
    direction = 'left',
    pauseOnHover = false,
    reverse = false,
    fade = false,
    className
  } = props

  const mask = fade
    ? `linear-gradient(${
        direction === 'left' ? 'to right' : 'to bottom'
      }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
    : undefined

  return (
    <div
      className={cn(
        'group flex overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className
      )}
      style={{
        maskImage: mask,
        WebkitMaskImage: mask,
        gap
      }}
    >
      {range(2).map((n) => (
        <div
          key={n}
          style={
            {
              '--gap': gap
            } as React.CSSProperties
          }
          className={cn(
            'flex shrink-0 justify-around gap-[var(--gap)]',
            direction === 'left' ? 'animate-marquee-left flex-row' : 'animate-marquee-up flex-col',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && 'direction-reverse'
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
