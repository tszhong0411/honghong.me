import NextLink from 'next/link'

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props

  if ((href as string).startsWith('/')) {
    return (
      <NextLink
        className='font-medium text-[#ff486d] no-underline hover:text-[#f97084] hover:underline'
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
        className='font-medium text-[#ff486d] no-underline hover:text-[#f97084] hover:underline'
        href={href}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <a
      className='font-medium text-[#ff486d] no-underline hover:text-[#f97084] hover:underline'
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
