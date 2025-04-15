import { cn } from '@/utils/cn'

type InputProps = React.ComponentProps<'input'>

const Input = (props: InputProps) => {
  const { className, type, ...rest } = props

  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'dark:bg-input/30 border-input shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow]',
        'md:text-sm',
        'placeholder:text-muted-foreground',
        'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'selection:bg-primary selection:text-primary-foreground',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...rest}
    />
  )
}

export { Input }
