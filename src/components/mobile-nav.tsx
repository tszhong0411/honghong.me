'use client'

import { IconMenu } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { HEADER_LINKS } from '@/config/links'

const MobileNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='flex h-9 w-9 items-center justify-center p-0 md:hidden'
          type='button'
          aria-label='Toggle menu'
          variant='ghost'
        >
          <IconMenu size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[10rem]'>
        {HEADER_LINKS.map((link) => (
          <DropdownMenuItem key={link.text} asChild>
            <Link href={link.href} className='flex items-center gap-4'>
              {link.icon}
              <div>{link.text}</div>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileNav
