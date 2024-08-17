import { createContext, useContext } from 'react'

import type { CommentsOutput } from '@/trpc/routers/comments'

export type IsReplyingParams = {
  value: boolean
  content?: string
}

export type CommentContext = {
  isEditing: boolean
  isReplying: IsReplyingParams
  isOpenReplies: boolean
  setIsEditing: (value: boolean) => void
  setIsReplying: ({ value, content }: IsReplyingParams) => void
  setIsOpenReplies: (value: boolean) => void
  slug: string
  comment: CommentsOutput['comments'][number]
}

const Context = createContext<CommentContext | undefined>(undefined)

export const useCommentContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useCommentContext must be used within a CommentProvider')
  }

  return context
}

export const CommentProvider = Context.Provider
