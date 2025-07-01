import type { ListCommentsOutput } from '@/orpc/routers'

import { createContext, use, useEffect, useRef } from 'react'
import { createStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type CommentState = {
  isEditing: boolean
  isReplying: boolean
  isOpenReplies: boolean
  comment: ListCommentsOutput['comments'][number]
  slug: string
}

type CommentActions = {
  setIsEditing: (value: boolean) => void
  setIsReplying: (value: boolean) => void
  setIsOpenReplies: (value: boolean) => void
  setComment: (comment: ListCommentsOutput['comments'][number]) => void
  setSlug: (slug: string) => void
}

type CommentStore = ReturnType<typeof createCommentStore>

const createCommentStore = (initialState: CommentState) =>
  createStore<CommentState & CommentActions>()((set) => ({
    ...initialState,
    setIsEditing: (isEditing) => set({ isEditing }),
    setIsReplying: (isReplying) => set({ isReplying }),
    setIsOpenReplies: (isOpenReplies) => set({ isOpenReplies }),
    setComment: (comment) => set({ comment }),
    setSlug: (slug) => set({ slug })
  }))

const CommentStoreContext = createContext<CommentStore | null>(null)
CommentStoreContext.displayName = 'CommentStoreContext'

type CommentProviderProps = {
  children: React.ReactNode
  comment: ListCommentsOutput['comments'][number]
  slug: string
}

export const CommentProvider = (props: CommentProviderProps) => {
  const { children, comment, slug } = props

  const storeRef = useRef<CommentStore | null>(null)

  storeRef.current ??= createCommentStore({
    comment,
    isEditing: false,
    isReplying: false,
    isOpenReplies: false,
    slug
  })

  useEffect(() => {
    storeRef.current?.getState().setComment(comment)
    storeRef.current?.getState().setSlug(slug)
  }, [comment, slug])

  return <CommentStoreContext value={storeRef.current}>{children}</CommentStoreContext>
}

export const useCommentStore = <T,>(selector: (state: CommentState & CommentActions) => T): T => {
  const commentStoreContext = use(CommentStoreContext)

  if (!commentStoreContext) {
    throw new Error('useCommentStore must be used within CommentProvider')
  }

  return useStoreWithEqualityFn(commentStoreContext, selector, shallow)
}
