import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const likesSessions = sqliteTable('likes_session', {
  id: text('id').notNull().primaryKey(),
  createdAt: integer('created_at', {
    mode: 'timestamp'
  })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  likes: integer('likes').notNull().default(0)
})
