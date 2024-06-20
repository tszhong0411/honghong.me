import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <div
        ref={ref}
        className={cn('bg-card text-card-foreground rounded-lg border shadow-sm', className)}
        {...rest}
      />
    )
  }
)

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...rest} />
  }
)

export const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      // eslint-disable-next-line jsx-a11y/heading-has-content -- content is passed via children
      <h3
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
        {...rest}
      />
    )
  }
)

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  const { className, ...rest } = props

  return <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...rest} />
})

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <div ref={ref} className={cn('px-6 pb-6', className)} {...rest} />
  }
)

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, ...rest } = props

    return <div ref={ref} className={cn('flex items-center px-6 pb-6', className)} {...rest} />
  }
)

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardTitle.displayName = 'CardTitle'
CardDescription.displayName = 'CardDescription'
CardContent.displayName = 'CardContent'
CardFooter.displayName = 'CardFooter'
