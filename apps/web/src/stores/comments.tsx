import type { ListCommentsInput } from '@/orpc/routers'

import { createContext, use, useEffect, useRef } from 'react'
import { createStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type CommentsState = {
  slug: string
  sort: ListCommentsInput['sort']
}

type CommentsActions = {
  setSlug: (slug: string) => void
  setSort: (sort: ListCommentsInput['sort']) => void
}

type CommentsStore = ReturnType<typeof createCommentsStore>

const createCommentsStore = (initialState: CommentsState) =>
  createStore<CommentsState & CommentsActions>()((set) => ({
    ...initialState,
    setSlug: (slug) => set({ slug }),
    setSort: (sort) => set({ sort })
  }))

const CommentsStoreContext = createContext<CommentsStore | null>(null)
CommentsStoreContext.displayName = 'CommentsStoreContext'

type CommentsProviderProps = {
  children: React.ReactNode
  slug: string
  sort: ListCommentsInput['sort']
}

export const CommentsProvider = (props: CommentsProviderProps) => {
  const { children, slug, sort } = props

  const storeRef = useRef<CommentsStore | null>(null)

  storeRef.current ??= createCommentsStore({
    slug,
    sort
  })

  useEffect(() => {
    storeRef.current?.getState().setSlug(slug)
    storeRef.current?.getState().setSort(sort)
  }, [slug, sort])

  return <CommentsStoreContext value={storeRef.current}>{children}</CommentsStoreContext>
}

export const useCommentsStore = <T,>(
  selector: (state: CommentsState & CommentsActions) => T
): T => {
  const commentsStoreContext = use(CommentsStoreContext)

  if (!commentsStoreContext) {
    throw new Error('useCommentsStore must be used within CommentsProvider')
  }

  return useStoreWithEqualityFn(commentsStoreContext, selector, shallow)
}
