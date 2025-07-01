import type { ListMessagesOutput } from '@/orpc/routers'

import { createContext, use, useEffect, useRef } from 'react'
import { createStore } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type MessageState = {
  message: ListMessagesOutput['messages'][number]
}

type MessageActions = {
  setMessage: (message: ListMessagesOutput['messages'][number]) => void
}

type MessageStore = ReturnType<typeof createMessageStore>

const createMessageStore = (initialState: MessageState) =>
  createStore<MessageState & MessageActions>()((set) => ({
    ...initialState,
    setMessage: (message) => set({ message })
  }))

const MessageStoreContext = createContext<MessageStore | undefined>(undefined)
MessageStoreContext.displayName = 'MessageStoreContext'

type MessageProviderProps = {
  children: React.ReactNode
  message: ListMessagesOutput['messages'][number]
}

export const MessageProvider = (props: MessageProviderProps) => {
  const { children, message } = props

  const storeRef = useRef<MessageStore | null>(null)

  storeRef.current ??= createMessageStore({ message })

  useEffect(() => {
    storeRef.current?.getState().setMessage(message)
  }, [message])

  return <MessageStoreContext value={storeRef.current}>{children}</MessageStoreContext>
}

export const useMessageStore = <T,>(selector: (state: MessageState & MessageActions) => T): T => {
  const messageStoreContext = use(MessageStoreContext)

  if (!messageStoreContext) {
    throw new Error('useMessageStore must be used within MessageProvider')
  }

  return useStoreWithEqualityFn(messageStoreContext, selector, shallow)
}
