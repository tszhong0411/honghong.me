import { cn } from '@tszhong0411/utils'
import TextareaAutosize, { type TextareaAutosizeProps } from 'react-textarea-autosize'

type TextareaProps = TextareaAutosizeProps & React.ComponentProps<'textarea'>

const Textarea = (props: TextareaProps) => {
  const { className, ...rest } = props

  return (
    <TextareaAutosize
      className={cn(
        'border-input bg-background ring-offset-background flex min-h-20 w-full rounded-lg border px-3 py-2',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export { Textarea }
