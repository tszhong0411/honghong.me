import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import fetcher from '@/lib/fetcher'
import { Views } from '@/lib/types'

export default function ViewCounter({ slug }) {
  const { locale } = useRouter()
  const { data } = useSWR<Views>(`/api/views/${slug.replace(`.${locale}`, '')}`, fetcher)
  const views = new Number(data?.total)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const registerView = () =>
      fetch(`/api/views/${slug.replace(`.${locale}`, '')}`, {
        method: 'POST',
      })

    registerView()
  }, [locale, slug])

  if (!mounted) return null

  return (
    <span>
      {views > 0 ? (
        `${views.toLocaleString()} views`
      ) : (
        <SkeletonTheme
          baseColor={theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'}
          highlightColor={theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'}
        >
          <Skeleton width={120} height={20} />
        </SkeletonTheme>
      )}
    </span>
  )
}
