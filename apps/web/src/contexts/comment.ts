import type { GetInfiniteCommentsOutput } from '@/trpc/routers/comments'

import { createContext, use } from 'react'

export type CommentContext = {
  isEditing: boolean
  isReplying: boolean
  isOpenReplies: boolean
  setIsEditing: (value: boolean) => void
  setIsReplying: (value: boolean) => void
  setIsOpenReplies: (value: boolean) => void
  slug: string
  comment: GetInfiniteCommentsOutput['comments'][number]
}

const Context = createContext<CommentContext | undefined>(undefined)
Context.displayName = 'CommentContext'

export const useCommentContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('useCommentContext must be used within a CommentProvider')
  }

  return context
}

export const CommentProvider = Context.Provider
