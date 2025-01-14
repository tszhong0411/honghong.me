'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@tszhong0411/utils'

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>

const Progress = (props: ProgressProps) => {
  const { className, value, ...rest } = props

  return (
    <ProgressPrimitive.Root
      className={cn('bg-secondary relative h-3 w-full overflow-hidden rounded-full', className)}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        className='bg-primary size-full flex-1 transition-all'
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
