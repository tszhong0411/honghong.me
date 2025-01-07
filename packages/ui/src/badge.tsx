import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'focus:ring-ring inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 border-transparent shadow',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 border-transparent shadow',
        outline: 'text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

export type BadgeProps = React.ComponentProps<'div'> & VariantProps<typeof badgeVariants>

export const Badge = (props: BadgeProps) => {
  const { className, variant, ...rest } = props

  return <div className={cn(badgeVariants({ variant }), className)} {...rest} />
}
