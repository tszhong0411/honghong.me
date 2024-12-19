import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const likesSessions = pgTable('likes_session', {
  id: text('id').notNull().primaryKey(),
  createdAt: timestamp('created_at', { precision: 3 }).notNull().defaultNow(),
  likes: integer('likes').notNull().default(0)
})
