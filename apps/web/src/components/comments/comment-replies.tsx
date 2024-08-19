'use client'

import { Button } from '@tszhong0411/ui'
import { Loader2Icon } from 'lucide-react'
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

  const { status, data, fetchNextPage, hasNextPage } =
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
    <div className='pl-12 sm:pl-14'>
      <Button
        variant='ghost'
        className='mb-3 px-3 py-2'
        onClick={() => {
          setIsOpenReplies(!isOpenReplies)
        }}
        type='button'
      >
        {isOpenReplies && status === 'pending' ? (
          <Loader2Icon className='mr-2 size-3 animate-spin' />
        ) : null}
        {comment.replies} Replies
      </Button>
      {isOpenReplies ? (
        <div>
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
          {hasNextPage ? <CommentLoader ref={ref} /> : null}
        </div>
      ) : null}
    </div>
  )
}

export default CommentReplies
