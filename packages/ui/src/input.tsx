import { cn } from '@tszhong0411/utils'

type InputProps = React.ComponentProps<'input'>

const Input = (props: InputProps) => {
  const { className, ...rest } = props

  return (
    <input
      className={cn(
        'border-input bg-background ring-offset-background flex h-10 w-full rounded-lg border px-3 py-2',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export { Input }
