import React from 'react'

import { getCurrentUser } from '@/lib/auth'
import { getComments } from '@/queries/comments'
import formatComments from '@/utils/format-comments'

import Comment from './comment'
import CommentBox from './comment-box'

type CommentsProps = {
  slug: string
}

const Comments = async (props: CommentsProps) => {
  const { slug } = props
  const comments = await getComments(slug)
  const user = await getCurrentUser()

  return (
    <div className='space-y-6'>
      <div className='rounded-lg border bg-accent p-4'>
        <CommentBox slug={slug} />
      </div>
      <div className='space-y-8'>
        {formatComments(comments).map((comment) => (
          <Comment key={comment.id} user={user} slug={slug} comment={comment} />
        ))}
      </div>
    </div>
  )
}

export default Comments
