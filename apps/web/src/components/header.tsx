'use client'

import { Link } from '@tszhong0411/ui'
import { Logo } from '@tszhong0411/ui'
import { Separator } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { motion } from 'framer-motion'
import React from 'react'

import CommandMenu from '@/components/command-menu'
import MobileNav from '@/components/mobile-nav'
import Navbar from '@/components/navbar'

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
    <motion.header
      className={cn(
        'fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl bg-background/30 px-8 shadow-sm saturate-100 backdrop-blur-[10px] transition-colors duration-200',
        isScrolled && 'bg-background/80'
      )}
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
    >
      <a
        href='#skip-nav'
        className='fixed left-4 top-4 -translate-y-20 rounded-sm bg-accent p-2 font-medium transition-transform duration-200 focus:translate-y-0 focus:ring focus:ring-ring focus:ring-offset-2'
      >
        <span>Skip to main content</span>
      </a>
      <Link href='/' className='flex items-center justify-center gap-1'>
        <span className='sr-only'>Homepage</span>
        <Logo width={28} height={28} aria-hidden='true' />
      </Link>
      <div className='flex items-center gap-2'>
        <Navbar />
        <Separator orientation='vertical' className='h-6' />
        <CommandMenu />
        <MobileNav />
      </div>
    </motion.header>
  )
}

export default Header
