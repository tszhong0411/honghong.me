import { IconArrowUpRight } from '@tabler/icons-react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

import clsxm from '@/lib/clsxm'

type LinkProps = {
  href: string
  icon?: boolean
  animation?: boolean
  nextLinkProps?: Omit<NextLinkProps, 'href'>
} & React.ComponentPropsWithRef<'a'>

const Link = (props: LinkProps) => {
  const {
    href,
    children,
    icon = true,
    animation = true,
    className,
    nextLinkProps,
    ...rest
  } = props
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return (
      <NextLink
        href={href}
        className={clsxm(
          'relative',
          {
            ['before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:rounded before:bg-hong-fg before:transition-transform before:duration-300 before:ease-in-out before:content-[""] hover:before:origin-left hover:before:scale-x-100']:
              animation,
          },
          className
        )}
        {...nextLinkProps}
        {...rest}
      >
        {children}
      </NextLink>
    )
  }

  if (isAnchorLink) {
    return (
      <a
        href={href}
        className={clsxm(
          'relative',
          {
            ['before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:rounded before:bg-hong-fg before:transition-transform before:duration-300 before:ease-in-out before:content-[""] hover:before:origin-left hover:before:scale-x-100']:
              animation,
          },
          className
        )}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      className={clsxm(
        'relative',
        {
          ['before:absolute before:-bottom-0.5 before:left-0 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:rounded before:bg-hong-fg before:transition-transform before:duration-300 before:ease-in-out before:content-[""] hover:before:origin-left hover:before:scale-x-100']:
            animation,
        },
        className
      )}
      {...rest}
    >
      {children}
      {icon && (
        <span>
          <IconArrowUpRight
            size={16}
            className='relative -top-px inline-block'
          />
        </span>
      )}
    </a>
  )
}

export default Link
