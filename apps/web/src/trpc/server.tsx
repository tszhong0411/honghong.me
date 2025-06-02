import 'server-only'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { createTRPCOptionsProxy, type TRPCQueryOptions } from '@trpc/tanstack-react-query'
import { cache } from 'react'

import { createTRPCContext } from './init'
import { makeQueryClient } from './query-client'
import { appRouter } from './root'

const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient
})

type HydrateClientProps = {
  children: React.ReactNode
}

export const HydrateClient = (props: HydrateClientProps) => {
  const { children } = props
  const queryClient = getQueryClient()

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- tRPC ensures queryOptions has the correct shape, so using `any` here is safe
export const prefetch = (queryOptions: ReturnType<TRPCQueryOptions<any>>) => {
  const queryClient = getQueryClient()

  if (queryOptions.queryKey[1]?.type === 'infinite') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- queryOptions matches the infinite-query signature, so cast to any to satisfy the overload
    void queryClient.prefetchInfiniteQuery(queryOptions as any)
  } else {
    void queryClient.prefetchQuery(queryOptions)
  }
}
