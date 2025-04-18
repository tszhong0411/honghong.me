'use client'

import type { Doc } from 'content-collections'

import { badgeVariants, Link } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { ExternalLinkIcon } from 'lucide-react'

const LinkBadges = (props: Doc['link'] = {}) => {
  const { doc, api } = props

  return (
    <div className='flex items-center gap-2 pt-4'>
      {doc && (
        <Link href={doc} className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}>
          Docs
          <ExternalLinkIcon className='size-3' />
        </Link>
      )}
      {api && (
        <Link href={api} className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}>
          API Reference
          <ExternalLinkIcon className='size-3' />
        </Link>
      )}
    </div>
  )
}

export default LinkBadges
