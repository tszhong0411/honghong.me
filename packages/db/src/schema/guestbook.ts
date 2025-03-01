import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './auth'

export const guestbook = pgTable('guestbook', {
  id: text('id').primaryKey(),
  body: text('body').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
})

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(users, {
    fields: [guestbook.userId],
    references: [users.id]
  })
}))
