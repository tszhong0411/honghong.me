import { createId } from '@paralleldrive/cuid2'
import { and, eq } from 'drizzle-orm'
import { type PlanetScaleDatabase } from 'drizzle-orm/planetscale-serverless'
import { type Adapter } from 'next-auth/adapters'

import type * as schema from './schema'
import { accounts, sessions, users, verificationTokens } from './schema'

export const DrizzleAdapter = (
  db: PlanetScaleDatabase<typeof schema>
): Adapter => {
  return {
    createUser: async (user) => {
      const id = createId()

      await db.insert(users).values({ ...user, id })

      return await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0]!)
    },
    getUser: async (id) => {
      return await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0] ?? null)
    },
    getUserByEmail: async (email) => {
      return await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .then((res) => res[0] ?? null)
    },
    createSession: async (session) => {
      await db.insert(sessions).values(session)

      return await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, session.sessionToken))
        .then((res) => res[0]!)
    },
    getSessionAndUser: async (sessionToken) => {
      return await db
        .select({
          session: sessions,
          user: users
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null)
    },
    updateUser: async (user) => {
      if (!user.id) {
        throw new Error('User must have an id.')
      }

      await db.update(users).set(user).where(eq(users.id, user.id))

      return await db
        .select()
        .from(users)
        .where(eq(users.id, user.id))
        .then((res) => res[0]!)
    },
    updateSession: async (session) => {
      await db
        .update(sessions)
        .set(session)
        .where(eq(sessions.sessionToken, session.sessionToken))

      return await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, session.sessionToken))
        .then((res) => res[0])
    },
    linkAccount: async (account) => {
      await db.insert(accounts).values(account)
    },
    getUserByAccount: async (account) => {
      const dbAccount = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .leftJoin(users, eq(accounts.userId, users.id))
        .then((res) => res[0] ?? null)

      if (!dbAccount) {
        return null
      }

      return dbAccount.user
    },
    deleteSession: async (sessionToken) => {
      const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .then((res) => res[0] ?? null)

      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken))

      return session
    },
    createVerificationToken: async (verificationToken) => {
      await db.insert(verificationTokens).values(verificationToken)

      return await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, verificationToken.identifier))
        .then((res) => res[0])
    },
    useVerificationToken: async ({ identifier, token }) => {
      try {
        const deletedToken = await db
          .select()
          .from(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, identifier),
              eq(verificationTokens.token, token)
            )
          )
          .then((res) => res[0] ?? null)

        await db
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, identifier),
              eq(verificationTokens.token, token)
            )
          )

        return deletedToken
      } catch {
        throw new Error('No verification token found.')
      }
    },
    deleteUser: async (id) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .then((res) => res[0] ?? null)

      await db.delete(users).where(eq(users.id, id))

      return user
    },
    unlinkAccount: async (account) => {
      await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
    }
  }
}
