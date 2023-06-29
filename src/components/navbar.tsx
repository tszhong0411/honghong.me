'use client'

import { cx } from '@tszhong0411/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HEADER_LINKS } from '@/config/links'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <ul className='hidden space-x-2 md:flex'>
      {HEADER_LINKS.map((link) => (
        <li key={link.text}>
          <Link
            className={cx(
              'rounded px-3 py-2 text-sm font-medium transition-colors duration-150',
              {
                ['text-accent-5 hover:bg-hover hover:text-accent-fg']:
                  link.href !== pathname,
              },
              {
                ['bg-accent-2']: link.href === pathname,
              }
            )}
            href={link.href}
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Navbar
