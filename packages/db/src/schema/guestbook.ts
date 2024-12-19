import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './auth'

export const guestbook = pgTable('guestbook', {
  id: text('id').notNull().primaryKey(),
  body: text('body').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { precision: 3 }).notNull().defaultNow()
})

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(users, {
    fields: [guestbook.userId],
    references: [users.id]
  })
}))
