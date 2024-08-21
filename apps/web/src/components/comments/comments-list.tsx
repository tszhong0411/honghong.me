'use client'

import { keepPreviousData } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useCommentsContext } from '@/contexts/comments'
import { useCommentParams } from '@/hooks/use-comment-params'
import { api } from '@/trpc/react'

import Comment from './comment'
import CommentLoader from './comment-loader'
import CommentHeader from './comments-header'

const CommentsList = () => {
  const { slug, sort } = useCommentsContext()
  const [params] = useCommentParams()

  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.comments.getInfiniteComments.useInfiniteQuery(
      {
        slug,
        sort,
        highlightedCommentId: params.comment ?? undefined
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        placeholderData: keepPreviousData
      }
    )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <>
      <CommentHeader />
      <div className='space-y-4 rounded-lg border py-2'>
        {status === 'success'
          ? data.pages.map((page) =>
              page.comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            )
          : null}
        {status === 'success' && data.pages[0]?.comments.length === 0 ? (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>No comments</p>
          </div>
        ) : null}
        {status === 'error' ? (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>
              Failed to load comments. Please refresh the page.
            </p>
          </div>
        ) : null}
        {status === 'pending' || isFetchingNextPage ? <CommentLoader /> : null}
        <span ref={ref} className='invisible' />
      </div>
    </>
  )
}

export default CommentsList
