'use client'

import type { GetInfiniteCommentsInput } from '@/trpc/routers/comments'

import { useCallback, useRef, useState } from 'react'

import { CommentsProvider } from '@/contexts/comments'

import { RatesProvider } from '../../contexts/rates'

import CommentList from './comment-list'
import CommentPost from './comment-post'

type CommentsProps = {
  slug: string
}

const Comments = (props: CommentsProps) => {
  const { slug } = props
  const mutationCount = useRef(0)
  const [sort, setSort] = useState<GetInfiniteCommentsInput['sort']>('newest')

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
          <CommentList />
        </div>
      </CommentsProvider>
    </RatesProvider>
  )
}

export default Comments
