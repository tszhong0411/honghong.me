'use client'

import { Loader2Icon } from 'lucide-react'

import { useCommentsContext } from '@/contexts/comments'
import { useCommentHighlighter } from '@/hooks/use-comment-highlighter'
import { api } from '@/trpc/react'

import Comment from './comment'

const Loader = () => {
  return (
    <div className='flex min-h-20 items-center justify-center'>
      <Loader2Icon className='size-7 animate-spin' />
    </div>
  )
}

const CommentsList = () => {
  const { slug } = useCommentsContext()
  const commentsQuery = api.comments.get.useQuery({
    slug,
    sort: 'newest'
  })

  useCommentHighlighter(commentsQuery.data)

  return (
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
  )
}

export default CommentsList
