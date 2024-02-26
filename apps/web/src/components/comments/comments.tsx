import * as React from 'react'

import { getCurrentUser } from '@/lib/auth'
import { getComments } from '@/queries/comments'

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
      <div className='rounded-lg border px-2 py-4 dark:bg-zinc-900/30 sm:px-4'>
        <CommentBox slug={slug} />
      </div>
      <div className='space-y-8'>
        {comments
          .filter((c) => !c.parentId)
          .map((comment) => (
            <Comment
              key={comment.id}
              user={user}
              slug={slug}
              comment={comment}
            />
          ))}
      </div>
    </div>
  )
}

export default Comments
