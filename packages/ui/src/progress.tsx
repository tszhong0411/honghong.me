import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@tszhong0411/utils'

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>

const Progress = (props: ProgressProps) => {
  const { className, value, ...rest } = props

  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className='bg-primary size-full flex-1 transition-all'
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
