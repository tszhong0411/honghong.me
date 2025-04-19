'use client'

import {
  Badge,
  Button,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@tszhong0411/ui'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { SIDEBAR_LINKS } from '@/config/links'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden' aria-label='Open navigation menu'>
          <MenuIcon className='size-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col gap-8 p-6'>
        <SheetHeader className='sr-only'>
          <SheetTitle>Navigation menu</SheetTitle>
          <SheetDescription>Navigation menu of the documentation site</SheetDescription>
        </SheetHeader>
        <Link href='/' className='font-semibold tracking-tighter' onClick={closeSheet}>
          @tszhong0411/docs
        </Link>
        <ScrollArea className='max-h-[calc(100vh-6rem)]'>
          {SIDEBAR_LINKS.map((section) => (
            <div key={section.title}>
              <div className='font-semibold'>{section.title}</div>
              <ul className='flex flex-col gap-3 py-4 text-sm font-medium'>
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground font-medium'
                      onClick={closeSheet}
                    >
                      {link.text}
                      {'isArkUI' in link && link.isArkUI && (
                        <Badge className='ml-2 bg-[#EB5E41] text-white'>Ark UI</Badge>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
