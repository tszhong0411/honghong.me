import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { type User as PrismaUser } from '@prisma/client'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env'

import prisma from './prisma'

declare module 'next-auth' {
  // We're extending interfaces from 'next-auth' and we can't use 'type' for these declarations.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user: PrismaUser
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-interface
  interface User extends PrismaUser {}
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

  adapter: PrismaAdapter(prisma),

  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id
      session.user.role = user.role

      return session
    }
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth(config)

export const getCurrentUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return session.user
}
