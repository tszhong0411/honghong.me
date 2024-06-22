import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export const linkVariants = cva('', {
  variants: {
    variant: {
      muted: 'text-muted-foreground hover:text-foreground transition-colors'
    }
  }
})

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof linkVariants>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href, className, children, variant, ...rest } = props

  if (!href) {
    throw new Error('Link must have an href')
  }

  if (href.startsWith('/')) {
    return (
      <NextLink
        ref={ref}
        className={cn(linkVariants({ variant, className }))}
        href={href}
        {...rest}
      >
        {children}
      </NextLink>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a className={cn(linkVariants({ variant, className }))} href={href} ref={ref} {...rest}>
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
      ref={ref}
      {...rest}
    >
      {children}
    </a>
  )
})

Link.displayName = 'Link'
