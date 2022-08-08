import {
  NavigationProgress,
  resetNavigationProgress,
  setNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress'
import { useRouter } from 'next/router'
import React from 'react'

export default function RouterTransition() {
  const router = useRouter()

  React.useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && startNavigationProgress()
    const handleComplete = () => setNavigationProgress(100)
    resetNavigationProgress()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.asPath, router.events])

  return <NavigationProgress />
}
