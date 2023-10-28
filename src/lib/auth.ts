import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/env'

declare module 'next-auth' {
  /**
   * The session object.
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Session {
    /**
     * The user object.
     */
    user: {
      /**
       * The user's email.
       */
      email: string
      /**
       * The user's name.
       */
      name: string | null
      /**
       * The user's picture.
       */
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
