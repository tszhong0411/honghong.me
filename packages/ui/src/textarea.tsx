'use client'

import { cn } from '@tszhong0411/utils'
import TextareaAutosize from 'react-textarea-autosize'

type TextareaProps = React.ComponentProps<typeof TextareaAutosize>

const Textarea = (props: TextareaProps) => {
  const { className, ...rest } = props

  return (
    <TextareaAutosize
      data-slot='textarea'
      className={cn(
        'border-input field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow]',
        'dark:aria-invalid:ring-destructive/40 dark:bg-input/30',
        'md:text-sm',
        'placeholder:text-muted-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export { Textarea }
