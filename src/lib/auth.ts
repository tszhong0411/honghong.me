import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/env.mjs'

const authOptions: NextAuthOptions = {
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

export default authOptions
