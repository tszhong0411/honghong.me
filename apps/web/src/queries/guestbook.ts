import { desc } from 'drizzle-orm'

import { db } from '@/db'
import { guestbook } from '@/db/schema'

export const getMessages = async () => {
  return db.query.guestbook.findMany({
    orderBy: [desc(guestbook.updatedAt)]
  })
}
