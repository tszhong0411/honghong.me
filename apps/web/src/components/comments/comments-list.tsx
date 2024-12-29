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

  const isSuccess = status === 'success'
  const isError = status === 'error'
  const isLoading = status === 'pending' || isFetchingNextPage
  const noComments = status === 'success' && data.pages[0]?.comments.length === 0

  return (
    <>
      <CommentHeader />
      <div className='space-y-8 py-2'>
        {isSuccess
          ? data.pages.map((page) =>
              page.comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            )
          : null}
        {noComments ? (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>No comments</p>
          </div>
        ) : null}
        {isError ? (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>
              Failed to load comments. Please refresh the page.
            </p>
          </div>
        ) : null}
        {isLoading ? <CommentLoader /> : null}
        <span ref={ref} className='invisible' />
      </div>
    </>
  )
}

export default CommentsList
