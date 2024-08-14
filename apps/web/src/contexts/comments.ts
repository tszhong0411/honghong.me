import { createContext, useContext } from 'react'

import type { CommentsInput } from '@/trpc/routers/comments'

type CommentsContext = {
  slug: string
  sort: CommentsInput['sort']
  setSort: (sort: CommentsInput['sort']) => void
}

const Context = createContext<CommentsContext | undefined>(undefined)

export const useCommentsContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useCommentsContext must be used within a CommentsProvider')
  }

  return context
}

export const CommentsProvider = Context.Provider
