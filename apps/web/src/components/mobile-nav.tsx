'use client'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Link
} from '@tszhong0411/ui'
import { MenuIcon } from 'lucide-react'

import { HEADER_LINKS } from '@/config/links'

const MobileNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='flex size-9 items-center justify-center p-0 md:hidden'
          type='button'
          aria-label='Toggle menu'
          variant='ghost'
        >
          <span className='sr-only'>Toggle menu</span>
          <MenuIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-40'>
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
