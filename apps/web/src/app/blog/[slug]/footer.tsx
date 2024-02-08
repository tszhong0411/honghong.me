'use client'

import { Link } from '@tszhong0411/ui'
import { dayjs } from '@tszhong0411/utils'
import React from 'react'

const editURL = (slug: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/src/content/blog/${slug}.mdx?plain=1`

type FooterProps = {
  slug: string
  modifiedTime: string
}

const Footer = (props: FooterProps) => {
  const { slug, modifiedTime } = props

  const [formattedDate, setFormattedDate] = React.useState('')

  React.useEffect(() => {
    setFormattedDate(dayjs(modifiedTime).format('DD/MM/YYYY'))
  }, [modifiedTime])

  return (
    <div className='my-8 flex w-full items-center justify-between py-4 text-sm'>
      <Link href={editURL(slug)} variant='muted'>
        Edit on GitHub
      </Link>
      <div className='text-muted-foreground'>
        Last updated: {formattedDate || '--/--/----'}
      </div>
    </div>
  )
}

export default Footer
