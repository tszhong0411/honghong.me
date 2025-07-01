import type { Outputs } from '@/orpc/client'

import { createMessage } from './create-message'
import { deleteMessage } from './delete-message'
import { getInfiniteMessages } from './get-infinite-messages'

export const guestbookRouter = {
  getInfiniteMessages,
  createMessage,
  deleteMessage
}

export type GetInfiniteMessagesOutput = Outputs['guestbook']['getInfiniteMessages']
