import { Anchor, AnchorProps } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons'
import Link, { LinkProps } from 'next/link'
import React from 'react'

import { useStyles } from './Link.styles'

type CustomLinkProps = {
  href: string
  icon?: boolean
  nextLinkProps?: Omit<LinkProps, 'href'>
} & React.ComponentPropsWithRef<'a'> &
  AnchorProps

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (props, ref) => {
    const { href, children, icon = true, nextLinkProps, ...rest } = props
    const isInternalLink = href && href.startsWith('/')
    const isAnchorLink = href && href.startsWith('#')
    const { classes } = useStyles()

    if (isInternalLink) {
      return (
        <Anchor
          component={Link}
          href={href}
          ref={ref}
          {...nextLinkProps}
          {...rest}
        >
          {children}
        </Anchor>
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
        {icon && (
          <span>
            <IconExternalLink size={18} className={classes.externalLink} />
          </span>
        )}
      </Anchor>
    )
  }
)

export default CustomLink
