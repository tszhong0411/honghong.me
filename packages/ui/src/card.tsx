import { cn } from '@tszhong0411/utils'

export const Card = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return (
    <div
      className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)}
      {...rest}
    />
  )
}

export const CardHeader = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return <div className={cn('flex flex-col gap-1.5 p-6', className)} {...rest} />
}

export const CardTitle = (props: React.ComponentProps<'h3'>) => {
  const { className, ...rest } = props

  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content -- content is passed via children
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...rest} />
  )
}

export const CardDescription = (props: React.ComponentProps<'p'>) => {
  const { className, ...rest } = props

  return <p className={cn('text-muted-foreground text-sm', className)} {...rest} />
}

export const CardContent = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return <div className={cn('px-6 pb-6', className)} {...rest} />
}

export const CardFooter = (props: React.ComponentProps<'div'>) => {
  const { className, ...rest } = props

  return <div className={cn('flex items-center px-6 pb-6', className)} {...rest} />
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'
