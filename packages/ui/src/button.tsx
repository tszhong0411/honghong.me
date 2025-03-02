import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'cva'
import { LoaderIcon } from 'lucide-react'

const buttonVariants = cva({
  base: [
    'ring-offset-background inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors',
    'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ],
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-8',
      icon: 'size-10'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type ButtonProps = { isPending?: boolean } & React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

const Button = (props: ButtonProps) => {
  const {
    className,
    variant,
    size,
    type = 'button',
    isPending,
    disabled,
    children,
    ...rest
  } = props

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      disabled={disabled ?? isPending}
      {...rest}
    >
      {isPending && <LoaderIcon className='mr-2 size-4 animate-spin' />}
      {children}
    </button>
  )
}

export { Button, type ButtonProps, buttonVariants }
