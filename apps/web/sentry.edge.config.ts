import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://6d87aa9808b74c8e5f863310083d49ec@o4504782633631744.ingest.us.sentry.io/4507633355390976',
  tracesSampleRate: 1,
  debug: false
})
