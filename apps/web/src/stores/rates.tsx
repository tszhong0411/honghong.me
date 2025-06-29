import { createContext, use, useRef } from 'react'
import { createStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type RatesState = {
  count: number
}

type RatesActions = {
  increment: () => void
  decrement: () => void
  getCount: () => number
}

type RatesStore = ReturnType<typeof createRatesStore>

const createRatesStore = (initialState: RatesState) =>
  createStore<RatesState & RatesActions>()((set, get) => ({
    ...initialState,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    getCount: () => get().count
  }))

const RatesStoreContext = createContext<RatesStore | null>(null)
RatesStoreContext.displayName = 'RatesStoreContext'

type RatesProviderProps = {
  children: React.ReactNode
  initialCount?: number
}

export const RatesProvider = (props: RatesProviderProps) => {
  const { children, initialCount = 0 } = props

  const storeRef = useRef<RatesStore | null>(null)

  storeRef.current ??= createRatesStore({ count: initialCount })

  return <RatesStoreContext value={storeRef.current}>{children}</RatesStoreContext>
}

export const useRatesStore = <T,>(selector: (state: RatesState & RatesActions) => T): T => {
  const ratesStoreContext = use(RatesStoreContext)

  if (!ratesStoreContext) {
    throw new Error('useRatesStore must be used within RatesProvider')
  }

  return useStoreWithEqualityFn(ratesStoreContext, selector, shallow)
}
