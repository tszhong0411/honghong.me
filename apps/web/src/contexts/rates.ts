import { createContext, use } from 'react'

type RatesContext = {
  increment: () => void
  decrement: () => void
  getCount: () => number
}

const Context = createContext<RatesContext | undefined>(undefined)
Context.displayName = 'RatesContext'

export const useRatesContext = () => {
  const context = use(Context)

  if (!context) {
    throw new Error('useRatesContext must be used within a RatesProvider')
  }

  return context
}

export const RatesProvider = Context.Provider
