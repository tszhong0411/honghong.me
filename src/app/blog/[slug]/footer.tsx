'use client'

import dayjs from 'dayjs'
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
    <div className='my-8 flex w-full items-center justify-between py-4 text-sm max-sm:flex-col max-sm:items-start max-sm:gap-4'>
      <a
        target='_blank'
        rel='noopener noreferrer'
        href={editURL(slug)}
        className='text-muted-foreground transition-colors duration-200 hover:text-foreground'
      >
        Edit on GitHub
      </a>
      <div className='text-muted-foreground'>
        Last updated: {formattedDate || '--/--/----'}
      </div>
    </div>
  )
}

export default Footer
