'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

import { isProduction } from '@/lib/constants'
import { useFormattedDate } from '@/hooks'

import ViewCounter from '@/components/ViewCounter'

import CommentCounter from './comment-counter'

type HeaderProps = {
  date: string
  title: string
  slug: string
}

const Header = (props: HeaderProps) => {
  const { date, title, slug } = props
  const formattedDate = useFormattedDate(date, 'YYYY年MM月DD日')

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: async () => {
      await fetch('/api/views', {
        method: 'POST',
        body: JSON.stringify({
          slug,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      queryClient.invalidateQueries({ queryKey: ['views', slug] })
    },
  })

  React.useEffect(() => {
    isProduction && mutate()
  }, [mutate])

  return (
    <>
      <div>{formattedDate}</div>
      <h1 className='mb-4 text-3xl font-bold'>{title}</h1>
      <div className='flex items-center gap-2'>
        {isProduction && (
          <>
            <ViewCounter slug={slug} />
            <div>/</div>
            <CommentCounter />
          </>
        )}
      </div>
    </>
  )
}

export default Header
