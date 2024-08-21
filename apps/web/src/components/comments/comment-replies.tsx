'use client'

import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCommentParams } from '@/hooks/use-comment-params'
import { api } from '@/trpc/react'

import Comment from './comment'
import CommentLoader from './comment-loader'

const CommentReplies = () => {
  const { comment, isOpenReplies, setIsOpenReplies } = useCommentContext()
  const { slug } = useCommentsContext()
  const [params] = useCommentParams()

  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.comments.getInfiniteComments.useInfiniteQuery(
      {
        slug,
        sort: 'oldest',
        parentId: comment.id,
        type: 'replies',
        highlightedCommentId: params.reply ?? undefined
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: isOpenReplies
      }
    )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  useEffect(() => {
    if (params.comment === comment.id) {
      setIsOpenReplies(true)
    }
  }, [comment.id, params.comment, setIsOpenReplies])

  return (
    <>
      {isOpenReplies ? (
        <div className='pl-8 pt-3'>
          {status === 'success'
            ? data.pages.map((page) =>
                page.comments.map((reply) => <Comment key={reply.id} comment={reply} />)
              )
            : null}
          {status === 'error' ? (
            <div className='flex min-h-20 items-center justify-center'>
              <p className='text-muted-foreground text-sm'>
                Failed to load replies. Please refresh the page.
              </p>
            </div>
          ) : null}
          {status === 'pending' || isFetchingNextPage ? <CommentLoader /> : null}
          <span ref={ref} className='invisible' />
        </div>
      ) : null}
    </>
  )
}

export default CommentReplies
