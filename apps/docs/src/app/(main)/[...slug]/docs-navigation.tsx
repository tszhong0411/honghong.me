'use client'

import { Link } from '@tszhong0411/ui'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { SIDEBAR_LINKS } from '@/config/links'

const DocsNavigation = () => {
  const pathname = usePathname()
  const links = SIDEBAR_LINKS.flatMap((s) => s.links)

  const currentIndex = links.findIndex((link) => link.href === pathname)
  const prevLink = links[currentIndex - 1] ?? null
  const nextLink = links[currentIndex + 1] ?? null

  return (
    <nav aria-label='Documentation navigation' className='flex justify-between'>
      {prevLink ? (
        <Link href={prevLink.href} className='group flex items-center gap-1.5' variant='muted'>
          <ChevronLeftIcon className='size-4 transition-transform group-hover:-translate-x-0.5' />
          <span>{prevLink.text}</span>
        </Link>
      ) : (
        <div />
      )}
      {nextLink ? (
        <Link href={nextLink.href} className='group flex items-center gap-1.5' variant='muted'>
          <span>{nextLink.text}</span>
          <ChevronRightIcon className='size-4 transition-transform group-hover:translate-x-0.5' />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}

export default DocsNavigation
