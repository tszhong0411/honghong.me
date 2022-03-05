import Link from 'next/link'
import React from 'react'
import { Box } from '../Box'
import { StyledLink } from './Styles'

const CustomLink = (props) => {
  const { children, href, variant, ...rest } = props
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <Link href={href} passHref>
        <StyledLink variant={variant} as={'a'} {...rest}>
          {children}
        </StyledLink>
      </Link>
    )
  }

  if (isAnchorLink) {
    return (
      <StyledLink variant={variant} as={'a'} href={href} {...rest}>
        {children}
      </StyledLink>
    )
  }

  return (
    <StyledLink
      variant={variant}
      as={'a'}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {children}
      <span>
        <Box
          as="svg"
          css={{
            position: 'relative',
            top: '-1px',
            ml: '$1',
            display: 'inline-block',
            height: '$4',
            width: '$4',
            verticalAlign: 'middle',
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </Box>
      </span>
    </StyledLink>
  )
}

export default CustomLink
