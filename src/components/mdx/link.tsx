import NextLink from 'next/link'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props

  if ((href as string).startsWith('/')) {
    return (
      <NextLink
        className='bg-[linear-gradient(rgb(0,0,0,0)70%,rgb(173,32,60)0)] no-underline'
        href={href as string}
        {...rest}
      >
        {children}
      </NextLink>
    )
  }

  if ((href as string).startsWith('#')) {
    return (
      <a
        className='bg-[linear-gradient(rgb(0,0,0,0)70%,rgb(173,32,60)0)] no-underline'
        href={href}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      className='bg-[linear-gradient(rgb(0,0,0,0)70%,rgb(173,32,60)0)] no-underline'
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      {...rest}
    >
      {children}
    </a>
  )
}

export default Link
