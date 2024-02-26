import { type Comment } from '@/actions/comment'

const formatComments = (comments: Comment[]) => {
  const map = new Map()

  const roots: Comment[] = []

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id

    map.set(commentId, i)
    ;(comments[i] as Comment).replies = []

    if (typeof comments[i]!.parentId === 'string') {
      const parentCommentIndex: number = map.get(comments[i]!.parentId)

      ;(comments[parentCommentIndex] as Comment).replies.push(
        comments[i] as Comment
      )

      continue
    }

    roots.push(comments[i] as Comment)
  }

  return roots
}

export default formatComments
