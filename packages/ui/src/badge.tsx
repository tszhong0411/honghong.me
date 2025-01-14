import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground border-transparent shadow',
        secondary: 'bg-secondary text-secondary-foreground border-transparent shadow',
        destructive: 'bg-destructive text-destructive-foreground border-transparent shadow',
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
