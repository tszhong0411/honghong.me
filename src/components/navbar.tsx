'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { HEADER_LINKS } from '@/config/links'
import cn from '@/utils/cn'

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav>
      <ul className='hidden space-x-2 md:flex'>
        {HEADER_LINKS.map((link) => {
          const isActive = link.href === pathname

          return (
            <li
              key={link.text}
              className='relative flex h-[60px] items-center justify-center'
            >
              <Link
                className={cn(
                  'rounded px-3 py-2 text-sm font-medium transition-colors duration-200',
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
              {isActive && (
                <>
                  <div className='absolute bottom-0 left-1/2 h-px w-12 -translate-x-1/2 bg-[radial-gradient(44.6%_825%_at_50%_50%,rgb(255,72,109)0%,rgb(255,72,109,0)100%)]' />
                  <div className='absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-[4px] bg-[#df1d48] blur-[8px]' />
                </>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
