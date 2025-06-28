import type { Post } from 'content-collections'

import { createContext, use, useEffect, useRef } from 'react'
import { createStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type PostState = {
  post: Post
}

type PostActions = {
  setPost: (post: Post) => void
}

type PostStore = ReturnType<typeof createPostStore>

const createPostStore = (initialState: PostState) =>
  createStore<PostState & PostActions>()((set) => ({
    ...initialState,
    setPost: (post) => set({ post })
  }))

const PostStoreContext = createContext<PostStore | null>(null)
PostStoreContext.displayName = 'PostStoreContext'

type PostProviderProps = {
  children: React.ReactNode
  post: Post
}

export const PostProvider = (props: PostProviderProps) => {
  const { children, post } = props

  const storeRef = useRef<PostStore | null>(null)

  storeRef.current ??= createPostStore({ post })

  useEffect(() => {
    storeRef.current?.getState().setPost(post)
  }, [post])

  return <PostStoreContext value={storeRef.current}>{children}</PostStoreContext>
}

export const usePostStore = <T,>(selector: (state: PostState & PostActions) => T): T => {
  const postStoreContext = use(PostStoreContext)

  if (!postStoreContext) {
    throw new Error('usePostStore must be used within PostProvider')
  }

  return useStoreWithEqualityFn(postStoreContext, selector, shallow)
}
