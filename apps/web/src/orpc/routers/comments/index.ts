import type { Inputs, Outputs } from '@/orpc/client'

import { deleteComment } from './delete-comment'
import { getCommentCount } from './get-comment-count'
import { getComments } from './get-comments'
import { getInfiniteComments } from './get-infinite-comments'
import { getReplyCount } from './get-reply-count'
import { getTotalCommentCount } from './get-total-comment-count'
import { postComment } from './post-comment'

export const commentsRouter = {
  getComments,
  getInfiniteComments,
  getTotalCommentCount,
  getCommentCount,
  getReplyCount,
  postComment,
  deleteComment
}

export type GetInfiniteCommentsInput = Inputs['comments']['getInfiniteComments']
export type GetInfiniteCommentsOutput = Outputs['comments']['getInfiniteComments']

export type GetCommentsOutput = Outputs['comments']['getComments']
