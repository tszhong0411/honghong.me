'use client'

import { isProduction } from '@/lib/constants'
import { useFormattedDate } from '@/hooks'

import ViewCounter from '@/components/ViewCounter'

import CommentCounter from './CommentCounter'

type HeaderProps = {
  date: string
  title: string
  slug: string
}

const Header = (props: HeaderProps) => {
  const { date, title, slug } = props
  const formattedDate = useFormattedDate(date, 'YYYY年MM月DD日')

  return (
    <>
      <div>{formattedDate}</div>
      <h1 className='mb-4 text-3xl font-bold'>{title}</h1>
      <div className='flex items-center gap-2'>
        {isProduction && (
          <>
            <ViewCounter type='POST' slug={slug} />
            <div>/</div>
            <CommentCounter />
          </>
        )}
      </div>
    </>
  )
}

export default Header
