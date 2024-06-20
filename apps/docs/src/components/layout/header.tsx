import { Link } from '@tszhong0411/ui'

import { HEADER_LINKS } from '@/config/links'

import MobileNav from './mobile-nav'
import ThemeToggle from './theme-toggle'

const Header = () => {
  return (
    <header className='border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8'>
        <div className='flex items-center gap-2 font-bold md:gap-6'>
          <MobileNav />
          <Link href='/' className='tracking-tighter max-md:hidden'>
            @tszhong0411/docs
          </Link>
          <nav>
            <ul className='flex gap-4 text-sm lg:gap-6'>
              {HEADER_LINKS.map((link) => (
                <li key={link.text} className='hover:text-foreground/80 text-foreground/60'>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
