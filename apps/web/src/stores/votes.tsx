import { createContext, use, useRef } from 'react'
import { createStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type VotesState = {
  count: number
}

type VotesActions = {
  increment: () => void
  decrement: () => void
  getCount: () => number
}

type VotesStore = ReturnType<typeof createVotesStore>

const createVotesStore = (initialState: VotesState) =>
  createStore<VotesState & VotesActions>()((set, get) => ({
    ...initialState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    getCount: () => get().count
  }))

const VotesStoreContext = createContext<VotesStore | null>(null)
VotesStoreContext.displayName = 'VotesStoreContext'

type VotesProviderProps = {
  children: React.ReactNode
  initialCount?: number
}

export const VotesProvider = (props: VotesProviderProps) => {
  const { children, initialCount = 0 } = props

  const storeRef = useRef<VotesStore | null>(null)

  storeRef.current ??= createVotesStore({ count: initialCount })

  return <VotesStoreContext value={storeRef.current}>{children}</VotesStoreContext>
}

export const useVotesStore = <T,>(selector: (state: VotesState & VotesActions) => T): T => {
  const votesStoreContext = use(VotesStoreContext)

  if (!votesStoreContext) {
    throw new Error('useVotesStore must be used within VotesProvider')
  }

  return useStoreWithEqualityFn(votesStoreContext, selector, shallow)
}
