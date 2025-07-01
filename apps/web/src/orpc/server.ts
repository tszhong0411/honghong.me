import 'server-only'

import { createRouterClient } from '@orpc/server'

import { createORPCContext } from './context'
import { router } from './routers'

globalThis.$client = createRouterClient(router, {
  // The context is a function that is called on every request.
  // We can't call `await createORPCContext()` directly because it would be
  // called only once when the server starts.
  context: () => createORPCContext()
})
