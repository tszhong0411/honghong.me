'use client'

import { Button } from '@tszhong0411/ui'
import { Loader2Icon } from 'lucide-react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCommentHighlighter } from '@/hooks/use-comment-highlighter'
import { api } from '@/trpc/react'

import Comment from './comment'

const CommentReplies = () => {
  const { comment, isOpenReplies, setIsOpenReplies } = useCommentContext()
  const { slug } = useCommentsContext()
  const commentsQuery = api.comments.get.useQuery(
    {
      slug,
      parentId: comment.id,
      sort: 'newest'
    },
    {
      enabled: isOpenReplies
    }
  )

  useCommentHighlighter(commentsQuery.data, comment.id, setIsOpenReplies)

  return (
    <div className='ml-10'>
      <Button
        variant='ghost'
        className='mb-3 px-3 py-2'
        onClick={() => {
          setIsOpenReplies(!isOpenReplies)
        }}
        type='button'
      >
        {isOpenReplies && commentsQuery.isLoading ? (
          <Loader2Icon className='mr-2 size-3 animate-spin' />
        ) : null}
        {comment.replies} Replies
      </Button>
      {isOpenReplies ? (
        <div>{commentsQuery.data?.map((reply) => <Comment key={reply.id} comment={reply} />)}</div>
      ) : null}
    </div>
  )
}

export default CommentReplies
