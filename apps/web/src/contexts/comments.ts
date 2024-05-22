import { createContext, useContext } from 'react'

export type CommentsContext = {
  slug: string
}

const CommentsContext = createContext<CommentsContext | undefined>(undefined)

export const useCommentsContext = () => {
  const context = useContext(CommentsContext)

  if (!context) {
    throw new Error('useCommentsContext must be used within a CommentsProvider')
  }

  return context
}

export const CommentsProvider = CommentsContext.Provider
