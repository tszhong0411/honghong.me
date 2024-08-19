import { cn } from '@tszhong0411/utils'
import { Loader2Icon } from 'lucide-react'
import { forwardRef } from 'react'

const CommentLoader = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <div
        ref={ref}
        className={cn('flex min-h-20 items-center justify-center', className)}
        {...rest}
      >
        <Loader2Icon className='size-7 animate-spin' />
      </div>
    )
  }
)

CommentLoader.displayName = 'Loader'

export default CommentLoader
