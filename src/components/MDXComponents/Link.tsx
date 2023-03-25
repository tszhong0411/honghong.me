import type { Route } from 'next'
import NextLink from 'next/link'

type LinkProps = React.ComponentPropsWithRef<'a'>

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props

  if ((href as string).startsWith('/')) {
    return (
      <NextLink href={href as Route} className='animated' {...rest}>
        {children}
      </NextLink>
    )
  }

  if ((href as string).startsWith('#')) {
    return (
      <a href={href} className='animated' {...rest}>
        {children}
      </a>
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
