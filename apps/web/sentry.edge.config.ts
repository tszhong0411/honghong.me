import * as Sentry from '@sentry/nextjs'
import { env } from '@tszhong0411/env'

Sentry.init({
  dsn: env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  debug: false
})
