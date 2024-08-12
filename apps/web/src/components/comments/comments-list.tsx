'use client'

import { keepPreviousData } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { useState } from 'react'

import { useCommentsContext } from '@/contexts/comments'
import { useCommentHighlighter } from '@/hooks/use-comment-highlighter'
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

import Comment from './comment'
import CommentHeader from './comments-header'

const Loader = () => {
  return (
    <div className='flex min-h-20 items-center justify-center'>
      <Loader2Icon className='size-7 animate-spin' />
    </div>
  )
}

const CommentsList = () => {
  const { slug } = useCommentsContext()
  const [sort, setSort] = useState<CommentsInput['sort']>('newest')

  const commentsQuery = api.comments.get.useQuery(
    {
      slug,
      sort
    },
    {
      placeholderData: keepPreviousData
    }
  )

  const commentsCountQuery = api.comments.getCommentsCount.useQuery({ slug })

  const repliesCountQuery = api.comments.getRepliesCount.useQuery({ slug })

  useCommentHighlighter(commentsQuery.data)

  return (
    <>
      <CommentHeader
        sort={sort}
        onSortChange={setSort}
        commentsCount={commentsCountQuery.data?.value}
        repliesCount={repliesCountQuery.data?.value}
      />
      <div className='space-y-2 rounded-lg border py-2 dark:bg-zinc-900/30'>
        {commentsQuery.isLoading ? (
          <Loader />
        ) : (
          commentsQuery.data
            ?.filter((c) => !c.parentId)
            .map((comment) => <Comment key={comment.id} comment={comment} />)
        )}
        {commentsQuery.data?.length === 0 ? (
          <div className='flex min-h-20 items-center justify-center'>
            <p className='text-muted-foreground text-sm'>No comments</p>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default CommentsList
