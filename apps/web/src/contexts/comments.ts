import { createContext, useContext } from 'react'

export type CommentsContext = {
  slug: string
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
