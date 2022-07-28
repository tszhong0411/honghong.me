/* eslint-disable jsx-a11y/anchor-has-content */
import { Anchor, AnchorProps } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { ExternalLink } from 'tabler-icons-react'

import { CustomLinkProps } from '@/components/Link/types'

import { useStyles } from './Link.styles'

const CustomLink = React.forwardRef<
  HTMLAnchorElement,
  AnchorProps & CustomLinkProps & React.ComponentPropsWithRef<'a'>
>((props, ref) => {
  const { href, children, noIcon = false, ...rest } = props
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')
  const { classes } = useStyles()

  if (isInternalLink) {
    return (
      <Link href={href} passHref>
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
          <ExternalLink size={18} className={classes.externalLink} />
        </span>
      )}
    </Anchor>
  )
})

export default CustomLink
