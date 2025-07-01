import type { NextRequest } from 'next/server'

import { db } from '@tszhong0411/db'
import { headers } from 'next/headers'

import { getSession } from '@/lib/auth'

export const createORPCContext = async (request?: NextRequest) => {
  const session = await getSession(request)

  return {
    session,
    db,
    headers: request?.headers ?? (await headers())
  }
}

export type Context = Awaited<ReturnType<typeof createORPCContext>>
