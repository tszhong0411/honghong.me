import { Skeleton } from '@tszhong0411/ui'
import { cn, range } from '@tszhong0411/utils'
import { forwardRef } from 'react'

const Placeholder = () => (
  <div className='rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30'>
    <div className='mb-3 flex gap-3'>
      <Skeleton className='size-10 rounded-full' />
      <div className='flex flex-col justify-center gap-1'>
        <Skeleton className='h-4 w-40 rounded-md' />
        <Skeleton className='h-4 w-36 rounded-md' />
      </div>
    </div>
    <Skeleton className='h-6 w-full max-w-xs rounded-md pl-[52px]' />
  </div>
)

const Loader = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div className={cn('flex flex-col gap-4', className)} ref={ref} {...rest}>
      {range(8).map((n) => (
        <Placeholder key={n} />
      ))}
    </div>
  )
})

Loader.displayName = 'Loader'

export default Loader
