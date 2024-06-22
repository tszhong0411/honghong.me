import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize'

type TextareaProps = TextareaAutosizeProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <TextareaAutosize
      ref={ref}
      className={cn(
        'border-input bg-background ring-offset-background flex min-h-20 w-full rounded-md border px-3 py-2 text-sm',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
})

Textarea.displayName = 'Textarea'
