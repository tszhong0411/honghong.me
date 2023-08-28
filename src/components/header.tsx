import Link from 'next/link'
import React from 'react'

import CommandMenu from '@/components/command-menu'
import MobileNav from '@/components/mobile-nav'
import Navbar from '@/components/navbar'
import { Logo } from '@/components/ui'

const Header = () => {
  return (
    <header className='fixed inset-x-0 top-0 z-40 bg-black/80 shadow-sm saturate-100 backdrop-blur-[10px]'>
      <div className='mx-auto flex h-[60px] max-w-5xl items-center justify-between px-8'>
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
