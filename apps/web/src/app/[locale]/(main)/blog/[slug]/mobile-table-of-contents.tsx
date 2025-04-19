'use client'

import type { TOC } from '@tszhong0411/mdx-plugins'

import { useTranslations } from '@tszhong0411/i18n/client'
import { useRouter } from '@tszhong0411/i18n/routing'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@tszhong0411/ui'
import { AlignLeftIcon } from 'lucide-react'
import { useState } from 'react'

import Link from '@/components/link'

type MobileTableOfContentsProps = {
  toc: TOC[]
}

const MobileTableOfContents = (props: MobileTableOfContentsProps) => {
  const { toc } = props
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const t = useTranslations()

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className='gap-2' asChild>
        <Button variant='secondary' className='fixed bottom-2 right-2 z-50 lg:hidden'>
          <AlignLeftIcon /> {t('blog.on-this-page')}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' side='top' className='px-0 py-2'>
        {toc.map((item) => {
          const { title, url, depth } = item

          return (
            <Link
              key={url}
              href={`#${url}`}
              className='text-muted-foreground hover:text-foreground block py-2.5 pr-2.5 text-sm leading-[1.2] transition-colors'
              style={{
                paddingLeft: (depth - 1) * 16
              }}
              onClick={() => {
                router.push(`#${url}`)
                setIsOpen(false)
              }}
            >
              {title}
            </Link>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

export default MobileTableOfContents
