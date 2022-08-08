import { NavigationProgress, setNavigationProgress } from '@mantine/nprogress'
import React from 'react'

export default function ReadingProgressBar() {
  const scrollHeight = () => {
    const el = document.documentElement,
      ScrollTop = el.scrollTop || document.body.scrollTop,
      ScrollHeight = el.scrollHeight || document.body.scrollHeight
    const percent = (ScrollTop / (ScrollHeight - el.clientHeight)) * 100

    setNavigationProgress(percent)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHeight)
    return () => window.removeEventListener('scroll', scrollHeight)
  })

  return <NavigationProgress autoReset={false} transitionDuration={0} />
}
