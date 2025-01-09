import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'

export const linkVariants = cva('', {
  variants: {
    variant: {
      muted: 'text-muted-foreground hover:text-foreground transition-colors'
    }
  }
})

type LinkProps = React.ComponentProps<'a'> & VariantProps<typeof linkVariants>

export const Link = (props: LinkProps) => {
  const { href, className, children, variant, ...rest } = props

  if (!href) {
    throw new Error('Link must have an href')
  }

  if (href.startsWith('/')) {
    return (
      <NextLink className={cn(linkVariants({ variant, className }))} href={href} {...rest}>
        {children}
      </NextLink>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a className={cn(linkVariants({ variant, className }))} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <a
      className={cn(linkVariants({ variant, className }))}
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      {...rest}
    >
      {children}
    </a>
  )
}
