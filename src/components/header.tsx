import { Logo } from '@tszhong0411/ui'
import Link from 'next/link'
import React from 'react'

import CommandMenu from '@/components/command-menu'
import MobileNav from '@/components/mobile-nav'
import Navbar from '@/components/navbar'

const Header = () => {
  return (
    <header className='fixed left-0 right-0 top-0 z-40 bg-white/80 shadow-sm saturate-[1.8] backdrop-blur-[10px] dark:bg-black/80 dark:saturate-100'>
      <div className='mx-auto flex h-[60px] max-w-4xl items-center justify-between px-8'>
        <Link
          href='/'
          className='flex items-center justify-center gap-1'
          aria-label='Homepage'
        >
          <Logo width={28} height={28} />
        </Link>
        <div className='flex items-center gap-2'>
          <Navbar />
          <CommandMenu />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
