'use client'

import Link from 'next/link'
import React from 'react'

import CommandMenu from '@/components/command-menu'
import MobileNav from '@/components/mobile-nav'
import Navbar from '@/components/navbar'
import { Logo } from '@/components/ui'
import cn from '@/utils/cn'

import ThemeSwitch from './theme-switch'
import { Separator } from './ui/separator'

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    document.addEventListener('scroll', changeBackground)

    return () => document.removeEventListener('scroll', changeBackground)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl bg-background/30 px-8 shadow-sm saturate-100 backdrop-blur-[10px] transition-colors duration-500',
          isScrolled && 'bg-background/80'
        )}
      >
        <Link
          href='/'
          className='flex items-center justify-center gap-1'
          aria-label='Homepage'
        >
          <Logo width={28} height={28} />
        </Link>
        <div className='flex items-center gap-2'>
          <Navbar />
          <Separator orientation='vertical' className='h-6' />
          <ThemeSwitch />
          <CommandMenu />
          <MobileNav />
        </div>
      </header>
      <a
        href='#skip-nav'
        className='absolute left-4 top-4 -translate-y-16 rounded-sm bg-background p-2 font-medium transition-transform duration-150 focus:translate-y-0 focus:ring focus:ring-ring focus:ring-offset-2'
      >
        <span>Skip to main content</span>
      </a>
    </>
  )
}

export default Header
