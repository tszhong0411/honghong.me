'use client'

import { CommentsProvider } from '@/stores/comments'
import { VotesProvider } from '@/stores/votes'

import CommentList from './comment-list'
import CommentPost from './comment-post'

type CommentSectionProps = {
  slug: string
}

const CommentSection = (props: CommentSectionProps) => {
  const { slug } = props

  return (
    <VotesProvider initialCount={0}>
      <CommentsProvider slug={slug} sort='newest'>
        <div className='space-y-6'>
          <CommentPost />
          <CommentList />
        </div>
      </CommentsProvider>
    </VotesProvider>
  )
}

export default CommentSection
