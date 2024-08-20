'use client'

import { QueryNormalizerProvider } from '@normy/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { env } from '@tszhong0411/env'
import { useState } from 'react'
import { SuperJSON } from 'superjson'

import type { AppRouter } from './root'

const createQueryClient = () => new QueryClient()

let clientQueryClientSingleton: QueryClient | undefined

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return createQueryClient()
  }

  return (clientQueryClientSingleton ??= createQueryClient())
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
    <QueryNormalizerProvider queryClient={queryClient} normalizerConfig={{ devLogging: true }}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryStreamedHydration transformer={SuperJSON}>
            {children}
          </ReactQueryStreamedHydration>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </api.Provider>
    </QueryNormalizerProvider>
  )
}
