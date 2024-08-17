import { relations, sql } from 'drizzle-orm'
import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { users } from './auth'
import { posts } from './posts'

export const comments = sqliteTable('comment', {
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
    .default(sql`(strftime('%s', 'now'))`),
  postId: text('post_id')
    .notNull()
    .references(() => posts.slug),
  parentId: text('parent_id'),
  isDeleted: integer('is_deleted', { mode: 'boolean' }).notNull().default(false)
})

export const rates = sqliteTable(
  'rate',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    commentId: text('comment_id')
      .notNull()
      .references(() => comments.id, { onDelete: 'cascade' }),
    like: integer('like', { mode: 'boolean' }).notNull()
  },
  (rate) => ({
    compoundKey: primaryKey({
      columns: [rate.userId, rate.commentId]
    })
  })
)

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id]
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.slug]
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: 'comment_replies'
  }),
  replies: many(comments, {
    relationName: 'comment_replies'
  }),
  rates: many(rates)
}))

export const ratesRelations = relations(rates, ({ one }) => ({
  user: one(users, {
    fields: [rates.userId],
    references: [users.id]
  }),
  comment: one(comments, {
    fields: [rates.commentId],
    references: [comments.id]
  })
}))
