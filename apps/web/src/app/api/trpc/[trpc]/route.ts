import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'

import { appRouter } from '@/trpc/root'
import { createTRPCContext } from '@/trpc/trpc'

export const runtime = 'edge'

const createContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers
  })
}

const handler = async (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
          }
        : undefined
  })

export { handler as GET, handler as POST }
