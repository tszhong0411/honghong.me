'use client'

import { Link, ScrollArea } from '@tszhong0411/ui'
import { cva } from 'class-variance-authority'
import { usePathname } from 'next/navigation'

import { SIDEBAR_LINKS } from '../../config/links'

const sidebarLinkVariants = cva('', {
  variants: {
    active: {
      true: 'text-foreground font-medium',
      false: 'hover:text-foreground/80 text-foreground/60 transition-colors'
    }
  }
})

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='sticky top-14 max-h-[calc(100vh-3.5rem)] w-full py-4 pr-4 max-md:hidden'>
      <ScrollArea className='h-full'>
        {SIDEBAR_LINKS.map((section) => (
          <div key={section.title}>
            <div className='font-semibold'>{section.title}</div>
            <ul className='flex flex-col gap-2.5 py-4 text-sm font-medium'>
              {section.links.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className={sidebarLinkVariants({
                      active: pathname === link.href
                    })}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
