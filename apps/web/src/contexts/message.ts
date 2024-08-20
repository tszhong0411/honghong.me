import { createContext, useContext } from 'react'

import type { GuestbookOutput } from '@/trpc/routers/guestbook'

export type MessageContext = {
  message: GuestbookOutput['messages'][number]
}

const Context = createContext<MessageContext | undefined>(undefined)

export const useMessageContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useMessageContext must be used within a MessageProvider')
  }

  return context
}

export const MessageProvider = Context.Provider
