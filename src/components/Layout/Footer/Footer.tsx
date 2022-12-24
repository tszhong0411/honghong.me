'use client'

import { isProduction } from '@/lib/constants'

import Link from '@/components/Link'
import NowPlaying from '@/components/NowPlaying'

import { FOOTER_LINKS } from '@/config/links'

const Footer = () => {
  return (
    <footer className='mx-auto flex max-w-4xl flex-col px-8 pb-8'>
      {isProduction && <NowPlaying />}
      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3'>
        {FOOTER_LINKS.map((list, i) => (
          <div key={i} className='mb-10 flex flex-col items-start gap-4 pr-4'>
            {list.links.map((link, j) => (
              <Link
                key={j}
                href={link.href}
                className='text-accent-5 transition-colors duration-300 hover:text-hong-fg'
              >
                {link.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className='mt-20 text-sm'>
        &copy; 小康 {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
