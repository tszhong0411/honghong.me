import { Anchor } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'

import { useStyles } from '@/components/Link/Link.styles'
import { CustomLinkProps } from '@/components/Link/types'

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (props, ref) => {
    const { href, children, noIcon, ...rest } = props
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
            <IconExternalLink size={18} className={classes.externalLink} />
          </span>
        )}
      </Anchor>
    )
  }
)

export default CustomLink
