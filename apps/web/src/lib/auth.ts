import type { NextRequest } from 'next/server'

import { db } from '@tszhong0411/db'
import { env } from '@tszhong0411/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { headers } from 'next/headers'

import { getBaseUrl } from '@/utils/get-base-url'

export const auth = betterAuth({
  baseURL: getBaseUrl(),
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true
  }),
  trustedOrigins: [getBaseUrl()],
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    }
  },
  user: {
    additionalFields: {
      role: { type: 'string', required: true, input: false, defaultValue: 'user' }
    }
  }
})

export const getSession = async (request?: NextRequest) => {
  return auth.api.getSession({
    headers: request ? request.headers : await headers()
  })
}
