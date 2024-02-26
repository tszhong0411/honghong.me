import { relations } from 'drizzle-orm'
import {
  boolean,
  int,
  longtext,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core'
import { type AdapterAccount } from 'next-auth/adapters'

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('email_verified', {
    mode: 'date',
    fsp: 3
  }).defaultNow(),
  image: varchar('image', { length: 255 }),
  role: mysqlEnum('role', ['user', 'admin']).notNull().default('user'),
  createdAt: timestamp('created_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow()
})

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255
    }).notNull(),
    refreshToken: varchar('refresh_token', { length: 255 }),
    accessToken: varchar('access_token', { length: 255 }),
    expiresAt: int('expires_at'),
    tokenType: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    idToken: varchar('id_token', { length: 255 }),
    sessionState: varchar('session_state', { length: 255 })
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId]
    })
  })
)

export const sessions = mysqlTable('session', {
  sessionToken: varchar('session_token', { length: 255 })
    .notNull()
    .primaryKey(),
  userId: varchar('user_id', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', {
    mode: 'date',
    fsp: 3
  }).notNull()
})

export const verificationTokens = mysqlTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', {
      mode: 'date',
      fsp: 3
    }).notNull()
  },
  (verificationToken) => ({
    compoundKey: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token]
    })
  })
)

export const guestbook = mysqlTable('guestbook', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  body: varchar('body', { length: 1024 }).notNull(),
  createdBy: varchar('created_by', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow()
})

export const posts = mysqlTable('post', {
  createdAt: timestamp('created_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow(),
  slug: varchar('slug', { length: 255 }).notNull().primaryKey(),
  likes: int('likes').notNull().default(0),
  views: int('views').notNull().default(0)
})

export const likesSessions = mysqlTable('likes_session', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow(),
  likes: int('likes').notNull().default(0)
})

export const comments = mysqlTable('comment', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  body: longtext('body').notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    fsp: 3
  })
    .notNull()
    .defaultNow(),
  postId: varchar('post_id', { length: 255 }).notNull(),
  parentId: varchar('parent_id', { length: 255 }),
  isDeleted: boolean('is_deleted').notNull().default(false)
})

export const commentUpvotes = mysqlTable('comment_upvote', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  commentId: varchar('comment_id', { length: 255 })
    .notNull()
    .references(() => comments.id, { onDelete: 'cascade' })
})

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  comments: many(comments),
  commentUpvotes: many(commentUpvotes)
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
  upvotes: many(commentUpvotes)
}))

export const commentUpvotesRelations = relations(commentUpvotes, ({ one }) => ({
  user: one(users, {
    fields: [commentUpvotes.userId],
    references: [users.id]
  }),
  comment: one(comments, {
    fields: [commentUpvotes.commentId],
    references: [comments.id]
  })
}))
