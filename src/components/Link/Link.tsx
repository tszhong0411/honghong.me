import { Anchor, AnchorProps } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons'
import Link, { LinkProps } from 'next/link'
import React from 'react'

import { useStyles } from './Link.styles'

type CustomLinkProps = {
  noIcon?: boolean
  nextLinkProps?: Omit<LinkProps, 'href'>
} & React.ComponentPropsWithRef<'a'> &
  AnchorProps

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (props, ref) => {
    const { href, children, noIcon, nextLinkProps, ...rest } = props
    const isInternalLink = href && href.startsWith('/')
    const isAnchorLink = href && href.startsWith('#')
    const { classes } = useStyles()

    if (isInternalLink) {
      return (
        <Link href={href} passHref {...nextLinkProps}>
          <Anchor ref={ref} {...rest}>
            {children}
          </Anchor>
        </Link>
      )
    }

    if (isAnchorLink) {
      return (
        <Anchor href={href} ref={ref} {...rest}>
          {children}
        </Anchor>
      )
    }
    return (
      <Anchor
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        ref={ref}
        {...rest}
      >
        {children}
        {!noIcon && (
          <span>
            <IconExternalLink size={18} className={classes.externalLink} />
          </span>
        )}
      </Anchor>
    )
  }
)

export default CustomLink
