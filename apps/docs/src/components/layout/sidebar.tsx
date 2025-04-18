'use client'

import { Badge, Link, ScrollArea } from '@tszhong0411/ui'
import { cva } from 'cva'
import { usePathname } from 'next/navigation'

import { SIDEBAR_LINKS } from '../../config/links'

const sidebarLinkVariants = cva({
  base: 'block rounded-lg px-4 py-2',
  variants: {
    active: {
      true: 'bg-red-500/10 font-semibold text-red-500',
      false: 'hover:bg-accent'
    }
  }
})

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className='sticky top-14 max-h-[calc(100vh-3.5rem)] w-full py-8 text-sm max-md:hidden'>
      <ScrollArea className='h-full pr-4'>
        {SIDEBAR_LINKS.map((section) => (
          <div key={section.title} className='mb-8'>
            <div className='px-4 font-semibold'>{section.title}</div>
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
    </aside>
  )
}

export default Sidebar
