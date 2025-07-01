import { env } from '@tszhong0411/env'

export const register = async () => {
  if (env.NEXT_RUNTIME === 'nodejs') {
    await import('@/orpc/server')
  }
}
