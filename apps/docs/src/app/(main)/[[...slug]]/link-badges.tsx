'use client'

import type { Doc } from 'content-collections'

import { ExternalLinkIcon } from 'lucide-react'

import { badgeVariants } from '@/components/ui/badge'
import { Link } from '@/components/ui/link'
import { cn } from '@/utils/cn'

const LinkBadges = (props: Doc['link'] = {}) => {
  const { doc, api } = props

  return (
    <div className='flex items-center gap-2 pt-4'>
      {doc ? (
        <Link href={doc} className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}>
          Docs
          <ExternalLinkIcon className='size-3' />
        </Link>
      ) : null}
      {api ? (
        <Link href={api} className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}>
          API Reference
          <ExternalLinkIcon className='size-3' />
        </Link>
      ) : null}
    </div>
  )
}

export default LinkBadges
