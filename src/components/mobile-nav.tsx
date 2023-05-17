'use client'

import { IconMenu } from '@tabler/icons-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tszhong0411/ui'
import Link from 'next/link'
import React from 'react'

import { HEADER_LINKS } from '@/config/links'

const MobileNav = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className='flex h-9 w-9 items-center justify-center p-0 md:hidden'
          type='button'
          aria-label='Toggle menu'
          title='Toggle menu'
          variant='ghost'
        >
          <IconMenu size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {HEADER_LINKS.map((link) => (
          <DropdownMenuItem key={link.text}>
            <Link
              href={link.href}
              className='flex items-center gap-4'
              onClick={() => setOpen(false)}
            >
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
