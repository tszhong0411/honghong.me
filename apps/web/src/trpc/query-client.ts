import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import { SuperJSON } from 'superjson'

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize
      }
    }
  })
