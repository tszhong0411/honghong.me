import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@tszhong0411/utils'

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root>

const ScrollArea = (props: ScrollAreaProps) => {
  const { className, children, ...rest } = props

  return (
    <ScrollAreaPrimitive.Root
      data-slot='scroll-area'
      className={cn('relative flex flex-col overflow-hidden', className)}
      {...rest}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot='scroll-area-viewport'
        className='focus-visible:ring-ring/50 size-full rounded-[inherit] outline-none transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px]'
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

type ScrollBarProps = React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>

const ScrollBar = (props: ScrollBarProps) => {
  const { className, orientation = 'vertical', ...rest } = props

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot='scroll-area-scrollbar'
      orientation={orientation}
      className={cn(
        'flex touch-none select-none p-px transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        className
      )}
      {...rest}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot='scroll-area-thumb'
        className='bg-border relative flex-1 rounded-full'
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
