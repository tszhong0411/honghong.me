'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useCommentParams } from '@/hooks/use-comment-params'
import { orpc } from '@/orpc/client'
import { CommentProvider, useCommentStore } from '@/stores/comment'
import { useCommentsStore } from '@/stores/comments'

import Comment from './comment'
import CommentLoader from './comment-loader'

const CommentReplies = () => {
  const { comment, isOpenReplies, setIsOpenReplies } = useCommentStore((state) => ({
    comment: state.comment,
    isOpenReplies: state.isOpenReplies,
    setIsOpenReplies: state.setIsOpenReplies
  }))
  const slug = useCommentsStore((state) => state.slug)
  const [params] = useCommentParams()
  const t = useTranslations()

  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    orpc.posts.comments.list.infiniteOptions({
      input: (pageParam: Date | undefined) => ({
        slug,
        sort: 'oldest',
        parentId: comment.id,
        type: 'replies',
        highlightedCommentId: params.reply ?? undefined,
        cursor: pageParam
      }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      enabled: isOpenReplies
    })
  )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  useEffect(() => {
    if (params.comment === comment.id) setIsOpenReplies(true)
  }, [comment.id, params.comment, setIsOpenReplies])

  const isSuccess = status === 'success'
  const isError = status === 'error'
  const isLoading = status === 'pending' || isFetchingNextPage

  return (
    <>
      {isOpenReplies && (
        <div className='space-y-8 pl-7'>
          {isSuccess &&
            data.pages.map((page) =>
              page.comments.map((reply) => (
                <CommentProvider key={reply.id} comment={reply} slug={slug}>
                  <Comment />
                </CommentProvider>
              ))
            )}
          {isError && (
            <div className='flex min-h-20 items-center justify-center'>
              <p className='text-muted-foreground text-sm'>
                {t('blog.comments.failed-to-load-replies')}
              </p>
            </div>
          )}
          {isLoading && <CommentLoader />}
          <span ref={ref} className='invisible' />
        </div>
      )}
    </>
  )
}

export default CommentReplies
