import { relations, sql } from 'drizzle-orm'
import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { users } from './auth'

export const guestbook = pgTable(
  'guestbook',
  {
    id: text('id').primaryKey(),
    body: text('body').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`),
    updatedAt: timestamp('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP(3)`)
  },
  (table) => [
    // Indexes for performance optimization
    index('idx_guestbook_created').on(table.createdAt.desc()),
    index('idx_guestbook_user_id').on(table.userId)
  ]
)

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(users, {
    fields: [guestbook.userId],
    references: [users.id]
  })
}))
