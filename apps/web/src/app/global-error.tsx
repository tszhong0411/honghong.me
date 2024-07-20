'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'

type GlobalErrorProps = {
  error: Error & { digest?: string }
}

const GlobalError = (props: GlobalErrorProps) => {
  const { error } = props

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang='en-US'>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  )
}

export default GlobalError
