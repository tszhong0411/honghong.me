import { relations, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { comments } from './comments'

export const posts = sqliteTable('post', {
  createdAt: integer('created_at', {
    mode: 'timestamp'
  })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  slug: text('slug').notNull().primaryKey(),
  likes: integer('likes').notNull().default(0),
  views: integer('views').notNull().default(0)
})

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments)
}))
