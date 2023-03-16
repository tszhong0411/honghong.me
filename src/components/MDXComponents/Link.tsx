import type { Route } from 'next'
import NextLink from 'next/link'

type LinkProps = {
  href: string
} & React.ComponentPropsWithRef<'a'>

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props
  const isExternal = typeof href === 'string' && href.startsWith('http')

  if (!isExternal) {
    return (
      <NextLink href={href as Route} className='animated' {...rest}>
        {children}
      </NextLink>
    )
  }

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      className='animated'
      {...rest}
    >
      {children}
    </a>
  )
}

export default Link
