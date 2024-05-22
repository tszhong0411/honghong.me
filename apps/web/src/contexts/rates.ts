import { createContext, useContext } from 'react'

export type RatesContext = {
  increment: () => void
  decrement: () => void
  getCount: () => number
}

const RatesContext = createContext<RatesContext | undefined>(undefined)

export const useRatesContext = () => {
  const context = useContext(RatesContext)

  if (!context) {
    throw new Error('useRatesContext must be used within a RatesProvider')
  }

  return context
}

export const RatesProvider = RatesContext.Provider
