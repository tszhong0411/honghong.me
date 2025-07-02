import type { router } from './routers'
import type { InferRouterInputs, InferRouterOutputs, RouterClient } from '@orpc/server'

import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { BatchLinkPlugin } from '@orpc/client/plugins'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'

import { isServer } from '@/lib/constants'

declare global {
  // eslint-disable-next-line no-var -- it's a global variable
  var $client: RouterClient<typeof router> | undefined
}

const link = new RPCLink({
  url: () => {
    if (isServer) {
      throw new Error('RPCLink is not allowed on the server side.')
    }

    return `${globalThis.location.origin}/rpc`
  },
  plugins: [
    new BatchLinkPlugin({
      groups: [{ condition: () => true, context: {} }]
    })
  ]
})

const client: RouterClient<typeof router> = globalThis.$client ?? createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)

export type Inputs = InferRouterInputs<typeof router>
export type Outputs = InferRouterOutputs<typeof router>
