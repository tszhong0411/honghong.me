import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/env'

import prisma from './prisma'

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    user: {
      email: string
      name: string | null
      image: string | null
    }
  }
}

const config: NextAuthConfig = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.OAUTH_CLIENT_KEY,
      clientSecret: env.OAUTH_CLIENT_SECRET
    })
  ],

  session: {
    strategy: 'jwt'
  },

  adapter: PrismaAdapter(prisma)
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
