'use client'

import { useCallback, useRef, useState } from 'react'

import { CommentsProvider } from '@/contexts/comments'
import type { CommentsInput } from '@/trpc/routers/comments'

import { RatesProvider } from '../../contexts/rates'
import CommentPost from './comment-post'
import CommentsList from './comments-list'

type CommentsProps = {
  slug: string
}

const Comments = (props: CommentsProps) => {
  const { slug } = props
  const mutationCount = useRef(0)
  const [sort, setSort] = useState<CommentsInput['sort']>('newest')

  const increment = useCallback(() => {
    mutationCount.current += 1
  }, [])

  const decrement = useCallback(() => {
    mutationCount.current -= 1
  }, [])

  const getCount = useCallback(() => mutationCount.current, [])

  return (
    <RatesProvider value={{ increment, decrement, getCount }}>
      <CommentsProvider
        value={{
          slug,
          sort,
          setSort
        }}
      >
        <div className='space-y-6'>
          <CommentPost />
          <CommentsList />
        </div>
      </CommentsProvider>
    </RatesProvider>
  )
}

export default Comments
