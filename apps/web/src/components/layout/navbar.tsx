'use client'

import { Link } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { usePathname } from 'next/navigation'

import { HEADER_LINKS } from '@/config/links'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav>
      <ul className='hidden gap-2 md:flex'>
        {HEADER_LINKS.map((link) => {
          const isActive = link.href === pathname

          return (
            <li key={link.text} className='relative flex h-[60px] items-center justify-center'>
              <Link
                className={cn(
                  'rounded px-3 py-2 text-sm font-medium transition-colors',
                  {
                    ['text-muted-foreground hover:text-foreground']: !isActive
                  },
                  {
                    ['text-foreground']: isActive
                  }
                )}
                href={link.href}
              >
                {link.text}
              </Link>
              {isActive ? (
                <>
                  <div className='bg-nav-link-indicator dark:bg-nav-link-indicator-dark absolute bottom-0 left-1/2 h-px w-12 -translate-x-1/2' />
                  <div className='absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-[4px] bg-[rgb(255_122_151)] blur dark:bg-[rgb(223_29_72)]' />
                </>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
