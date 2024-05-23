import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp
} from 'drizzle-orm/pg-core'
import { type AdapterAccountType } from 'next-auth/adapters'

export const roleEnum = pgEnum('role', ['user', 'admin'])

export const users = pgTable('user', {
  id: text('id')
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('email_verified', {
    mode: 'date',
    precision: 3
  }).defaultNow(),
  image: text('image'),
  role: roleEnum('role').default('user').notNull(),
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
    .defaultNow()
})

export const accounts = pgTable(
  'account',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
)

export const sessions = pgTable('session', {
  sessionToken: text('session_token').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', {
    mode: 'date',
    precision: 3
  }).notNull()
})

export const verificationTokens = pgTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', {
      mode: 'date',
      precision: 3
    }).notNull()
  },
  (verificationToken) => ({
    compoundKey: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token]
    })
  })
)

export const guestbook = pgTable('guestbook', {
  id: text('id').notNull().primaryKey(),
  body: text('body').notNull(),
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
    .defaultNow()
})

export const posts = pgTable('post', {
  createdAt: timestamp('created_at', {
    mode: 'date',
    precision: 3
  })
    .notNull()
    .defaultNow(),
  slug: text('slug').notNull().primaryKey(),
  likes: integer('likes').notNull().default(0),
  views: integer('views').notNull().default(0)
})

export const likesSessions = pgTable('likes_session', {
  id: text('id').notNull().primaryKey(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    precision: 3
  })
    .notNull()
    .defaultNow(),
  likes: integer('likes').notNull().default(0)
})

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

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  comments: many(comments),
  guestbook: many(guestbook)
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id]
  })
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}))

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments)
}))

export const guestbookRelations = relations(guestbook, ({ one }) => ({
  user: one(users, {
    fields: [guestbook.userId],
    references: [users.id]
  })
}))

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
