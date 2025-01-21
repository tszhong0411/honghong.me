import type { GetInfiniteMessagesOutput } from '@/trpc/routers/guestbook'

import { createContext, useContext } from 'react'

export type MessageContext = {
  message: GetInfiniteMessagesOutput['messages'][number]
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
