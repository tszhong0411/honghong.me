import { relations } from 'drizzle-orm'
import {
  boolean,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp
} from 'drizzle-orm/pg-core'

import { users } from './auth'
import { posts } from './posts'

export const comments = pgTable('comment', {
  id: text('id').notNull().primaryKey(),
  body: jsonb('body'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', {
    mode: 'date',
    precision: 3
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    precision: 3
  })
    .notNull()
    .defaultNow(),
  postId: text('post_id')
    .notNull()
    .references(() => posts.slug),
  parentId: text('parent_id'),
  isDeleted: boolean('is_deleted').notNull().default(false)
})

export const rates = pgTable(
  'rate',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    commentId: text('comment_id')
      .notNull()
      .references(() => comments.id, { onDelete: 'cascade' }),
    like: boolean('like').notNull()
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
