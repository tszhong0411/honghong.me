'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@tszhong0411/utils'

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root>

const Slider = (props: SliderProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.Root
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...rest}
    >
      <SliderPrimitive.Track className='bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full'>
        <SliderPrimitive.Range className='bg-primary absolute h-full' />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className='border-primary/50 bg-background focus-visible:ring-ring block size-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50' />
    </SliderPrimitive.Root>
  )
}

export { Slider }
