'use client'

import { Button, ScrollArea, Sheet, SheetContent, SheetTrigger } from '@tszhong0411/ui'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SIDEBAR_LINKS } from '@/config/links'

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button type='button' variant='ghost' size='icon' className='md:hidden'>
          <span className='sr-only'>Toggle menu</span>
          <MenuIcon className='size-5' />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='flex flex-col gap-8'>
        <Link href='/' className='font-semibold tracking-tighter'>
          @tszhong0411/docs
        </Link>
        <ScrollArea className='max-h-[calc(100vh-3.5rem)]'>
          {SIDEBAR_LINKS.map((section) => (
            <div key={section.title}>
              <div className='font-semibold'>{section.title}</div>
              <ul className='flex flex-col gap-3 py-4 text-sm font-medium'>
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      href={link.href}
                      className='text-muted-foreground font-medium'
                      onClick={() => {
                        router.push(link.href)
                        setIsOpen(false)
                      }}
                    >
                      {link.text}
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
