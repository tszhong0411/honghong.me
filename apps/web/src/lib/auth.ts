import { DrizzleAdapter } from '@auth/drizzle-adapter'
import type { InferSelectModel } from 'drizzle-orm'
import type { DefaultSession, NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { cache } from 'react'

import { db } from '@/db'
import { accounts, sessions, users, verificationTokens } from '@/db/schema'
import { env } from '@/env'
import { getDefaultUser } from '@/utils/get-default-user'

declare module 'next-auth' {
  interface Session extends Omit<DefaultSession, 'user'> {
    user: {
      id: string
      name?: string | null
      email: string
      image?: string | null
      role: InferSelectModel<typeof users>['role']
    }
  }

  interface User {
    role: InferSelectModel<typeof users>['role']
  }
}

const config: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
  ],

  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }),

  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role
        }
      }
    }
  }
}

export const {
  handlers: { GET, POST }
} = NextAuth(config)

export const auth = NextAuth(config).auth

export const getCurrentUser = cache(async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  const { defaultImage, defaultName } = getDefaultUser(session.user.id)

  return {
    ...session.user,
    name: session.user.name ?? defaultName,
    image: session.user.image ?? defaultImage
  }
})

export type User = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>
