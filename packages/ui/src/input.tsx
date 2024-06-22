import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <input
      ref={ref}
      className={cn(
        'border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
})

Input.displayName = 'Input'
