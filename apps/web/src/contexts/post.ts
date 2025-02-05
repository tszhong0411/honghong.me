import type { Post } from 'content-collections'

import { createContext, useContext } from 'react'

type PostContext = Post

const Context = createContext<PostContext | undefined>(undefined)

export const usePostContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider')
  }

  return context
}

export const PostProvider = Context.Provider
