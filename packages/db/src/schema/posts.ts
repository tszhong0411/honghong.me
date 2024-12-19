import { relations } from 'drizzle-orm'
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { comments } from './comments'

export const posts = pgTable('post', {
  createdAt: timestamp('created_at', { precision: 3 }).notNull().defaultNow(),
  slug: text('slug').notNull().primaryKey(),
  likes: integer('likes').notNull().default(0),
  views: integer('views').notNull().default(0)
})

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments)
}))
