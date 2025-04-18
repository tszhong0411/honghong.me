import { cn } from '@tszhong0411/utils'

type InputProps = React.ComponentProps<'input'>

const Input = (props: InputProps) => {
  const { className, type, ...rest } = props

  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow]',
        'dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        'md:text-sm',
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground',
        'selection:bg-primary selection:text-primary-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
}

export { Input }
