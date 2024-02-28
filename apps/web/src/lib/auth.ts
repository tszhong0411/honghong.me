import type { NextAuthConfig, NextAuthResult } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { db, DrizzleAdapter } from '@/db'
import type { users } from '@/db/schema'
import { env } from '@/env'

type DatabaseUser = typeof users.$inferSelect

declare module 'next-auth' {
  // We're extending interfaces from 'next-auth' and we can't use 'type' for these declarations.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user: DatabaseUser
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  interface User extends DatabaseUser {}
}

const config: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.OAUTH_CLIENT_KEY,
      clientSecret: env.OAUTH_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],

  adapter: DrizzleAdapter(db),

  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      session.user.role = user.role

      return session
    }
  }
}

export const {
  handlers: { GET, POST }
} = NextAuth(config)

export const auth: NextAuthResult['auth'] = NextAuth(config).auth

export const getCurrentUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return session.user
}
