'use client'

import type { AppRouter } from './root'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { env } from '@tszhong0411/env'
import { useState } from 'react'
import { SuperJSON } from 'superjson'

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5
      }
    }
  })

let clientQueryClientSingleton: QueryClient | undefined

const getBaseUrl = () => {
  if (typeof globalThis !== 'undefined') return ''
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const getQueryClient = () => {
  if (typeof globalThis === 'undefined') {
    return createQueryClient()
  }

  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient()
  }

  return clientQueryClientSingleton
}

export const api = createTRPCReact<AppRouter>()

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

type TRPCReactProviderProps = {
  children: React.ReactNode
}

export const TRPCReactProvider = (props: TRPCReactProviderProps) => {
  const { children } = props
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error)
        }),
        unstable_httpBatchStreamLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`,
          headers: () => {
            const headers = new Headers()
            headers.set('x-trpc-source', 'nextjs-react')
            return headers
          }
        })
      ]
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line @eslint-react/no-context-provider -- custom context */}
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {children}
        <ReactQueryDevtools />
      </api.Provider>
    </QueryClientProvider>
  )
}
