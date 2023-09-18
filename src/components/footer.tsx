import NextLink from 'next/link'

import { FOOTER_LINKS, type Link } from '@/config/links'

import CurrentVisitors from './current-visitors'
import NowPlaying from './now-playing'

const FooterLink = (props: Link) => {
  const { title, href } = props

  if (href.startsWith('/')) {
    return (
      <NextLink
        href={href}
        className='text-muted-foreground transition-colors duration-150 hover:text-foreground'
      >
        {title}
      </NextLink>
    )
  }

  return (
    <a
      href={href}
      className='text-muted-foreground transition-colors duration-150 hover:text-foreground'
      target='_blank'
      rel='noopener noreferrer'
    >
      {title}
    </a>
  )
}

const Footer = () => {
  return (
    <footer className='mx-auto flex max-w-5xl flex-col px-8 pb-8'>
      <NowPlaying />
      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3'>
        {FOOTER_LINKS.map((list) => (
          <div
            key={list.id}
            className='mb-10 flex flex-col items-start gap-4 pr-4'
          >
            {list.links.map((link) => (
              <FooterLink key={link.title} {...link} />
            ))}
          </div>
        ))}
      </div>
      <div className='mt-20 flex items-center justify-between text-sm'>
        <div>&copy; {new Date().getFullYear()} Hong</div>
        {process.env.NODE_ENV === 'production' && <CurrentVisitors />}
      </div>
    </footer>
  )
}

export default Footer
