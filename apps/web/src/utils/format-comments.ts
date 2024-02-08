import { type Comment, type CommentWithReplies } from '@/actions/comment'

const formatComments = (comments: Comment[]) => {
  const map = new Map()

  const roots: CommentWithReplies[] = []

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id

    map.set(commentId, i)
    ;(comments[i] as CommentWithReplies).replies = []

    if (typeof comments[i]!.parentId === 'string') {
      const parentCommentIndex: number = map.get(comments[i]!.parentId)

      ;(comments[parentCommentIndex] as CommentWithReplies).replies.push(
        comments[i] as CommentWithReplies
      )

      continue
    }

    roots.push(comments[i] as CommentWithReplies)
  }

  return roots
}

export default formatComments
