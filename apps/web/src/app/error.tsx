'use client'

import * as Sentry from '@sentry/nextjs'
import { Button } from '@tszhong0411/ui'
import { useEffect } from 'react'

type PageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Page = (props: PageProps) => {
  const { error, reset } = props

  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <div className='h-content space-y-4 px-2 py-8'>
      <h1 className='text-2xl font-bold'>Something went wrong!</h1>
      <Button onClick={reset} type='button'>
        Try again
      </Button>
      <p className='break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800'>{error.message}</p>
    </div>
  )
}

export default Page
