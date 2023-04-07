'use client'

import { IconCommand, IconMenu } from '@tabler/icons-react'
import clsx from 'clsx'
import { useKBar } from 'kbar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import Dropdown from '@/components/Dropdown'

import { HEADER_LINKS } from '@/config/links'

import HeaderLogo from './HeaderLogo'

const Header = () => {
  const pathname = usePathname()
  const { query } = useKBar()

  return (
    <header className='fixed left-0 right-0 top-0 z-40 bg-white/80 shadow-sm saturate-[1.8] backdrop-blur-[10px] dark:bg-black/50 dark:saturate-100'>
      <div className='mx-auto flex h-[60px] max-w-4xl items-center justify-between px-8'>
        <HeaderLogo />
        <div className='flex items-center gap-2'>
          <ul className='hidden space-x-2 md:flex'>
            {HEADER_LINKS.map((link) => (
              <li key={link.text}>
                <Link
                  className={clsx(
                    'rounded px-3 py-2 text-sm font-medium transition-colors duration-300',
                    {
                      ['text-accent-5 hover:bg-accent-1 hover:text-hong-fg']:
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
          <button
            className='flex h-9 w-9 items-center justify-center rounded-md duration-300 hover:bg-accent-2'
            onClick={() => query.toggle()}
            type='button'
            aria-label='Command Bar'
          >
            <IconCommand size={20} />
          </button>
          <Dropdown>
            <Dropdown.Trigger>
              <button
                className='flex h-9 w-9 items-center justify-center rounded-md duration-300 hover:bg-accent-2 md:hidden'
                type='button'
                aria-label='Toggle menu'
              >
                <IconMenu size={20} />
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {HEADER_LINKS.map((link) => (
                <Dropdown.Item key={link.text} asChild>
                  <Link
                    href={link.href}
                    className='flex
                items-center gap-4'
                  >
                    {link.icon}
                    <div>{link.text}</div>
                  </Link>
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default Header
