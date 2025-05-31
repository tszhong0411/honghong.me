'use client'

import type { AppRouter } from './root'
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { env } from '@tszhong0411/env'
import { useState } from 'react'
import { SuperJSON } from 'superjson'

import { makeQueryClient } from './query-client'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient | undefined

const getBaseUrl = () => {
  if (typeof globalThis !== 'undefined') return ''
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

const getQueryClient = () => {
  if (typeof globalThis === 'undefined') {
    return makeQueryClient()
  }

  browserQueryClient ??= makeQueryClient()

  return browserQueryClient
}

export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>

type TRPCReactProviderProps = {
  children: React.ReactNode
}

export const TRPCReactProvider = (props: TRPCReactProviderProps) => {
  const { children } = props
  const queryClient = getQueryClient()

  // eslint-disable-next-line @eslint-react/naming-convention/use-state -- it's fine
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: `${getBaseUrl()}/api/trpc`
        }),
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error)
        })
      ]
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
