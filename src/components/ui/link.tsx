import { cva, type VariantProps } from 'class-variance-authority'
import NextLink from 'next/link'
import React from 'react'

import cn from '@/utils/cn'

const linkVariants = cva('', {
  variants: {
    variant: {
      article:
        'bg-[linear-gradient(rgb(0,0,0,0)70%,rgb(173,32,60)0)] no-underline',
      muted:
        'text-muted-foreground transition-colors duration-200 hover:text-foreground'
    }
  }
})

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants>

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { href, className, children, variant, ...rest } = props

  if ((href as string).startsWith('/')) {
    return (
      <NextLink
        className={cn(linkVariants({ variant, className }))}
        href={href as string}
        ref={ref}
        {...rest}
      >
        {children}
      </NextLink>
    )
  }

  if ((href as string).startsWith('#')) {
    return (
      <a
        className={cn(linkVariants({ variant, className }))}
        href={href}
        ref={ref}
        {...rest}
      >
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

export { Link, linkVariants }
