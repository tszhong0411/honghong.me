import { StandardRPCJsonSerializer } from '@orpc/client/standard'
import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'

const serializer = new StandardRPCJsonSerializer()

export const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        serializeData: (data) => {
          const [json, meta] = serializer.serialize(data)
          return { json, meta }
        }
      },
      hydrate: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- safe
        deserializeData: (data) => serializer.deserialize(data.json, data.meta)
      }
    }
  })
}
