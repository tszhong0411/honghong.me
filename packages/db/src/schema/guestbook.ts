import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { users } from './auth'

export const guestbook = sqliteTable('guestbook', {
  id: text('id').notNull().primaryKey(),
  body: text('body').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', {
    mode: 'timestamp'
  })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', {
    mode: 'timestamp'
  })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`)
})

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(users, {
    fields: [guestbook.userId],
    references: [users.id]
  })
}))
