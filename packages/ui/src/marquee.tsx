import { cn, range } from '@tszhong0411/utils'

type MarqueeProps = {
  children: React.ReactNode
  /**
   * The gap between each child.
   * @default '1rem'
   * @example '20px' | '1rem' | '2em'
   */
  gap?: string
  /**
   * The direction of the marquee.
   * @default 'left'
   */
  direction?: 'left' | 'up'
  /**
   * Pause the marquee on hover.
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Reverse the direction of the marquee.
   * @default false
   */
  reverse?: boolean
  /**
   * Fade the marquee edges.
   * @default false
   */
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

  return (
    <div
      className={cn(
        'group flex overflow-hidden',
        direction === 'left' ? 'flex-row' : 'flex-col',
        className
      )}
      style={{
        maskImage: fade
          ? `linear-gradient(${direction === 'left' ? 'to right' : 'to bottom'
          }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
        WebkitMaskImage: fade
          ? `linear-gradient(${direction === 'left' ? 'to right' : 'to bottom'
          }, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)`
          : undefined,
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
            direction === 'left'
              ? 'animate-marquee-left flex-row'
              : 'animate-marquee-up flex-col',
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
