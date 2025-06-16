import { Link as LocalizedLink } from '@tszhong0411/i18n/routing'

type LinkProps = React.ComponentProps<'a'>

const Link = (props: LinkProps) => {
  const { href, children, ...rest } = props

  if (!href) {
    throw new Error('Link must have an href')
  }

  if (href.startsWith('http')) {
    return (
      // eslint-disable-next-line no-restricted-syntax -- it's an external link
      <a target='_blank' rel='noopener noreferrer' href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <LocalizedLink href={href} {...rest}>
      {children}
    </LocalizedLink>
  )
}

export default Link
