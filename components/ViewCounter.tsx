import { useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import fetcher from '@/lib/fetcher'
import { Views } from '@/lib/types'

export default function ViewCounter({ slug }) {
  const { locale } = useRouter()
  const { data } = useSWR<Views>(`/api/views/${slug.replace(`.${locale}`, '')}`, fetcher)
  const views = new Number(data?.total)

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug.replace(`.${locale}`, '')}`, {
        method: 'POST',
      })

    registerView()
  }, [locale, slug])

  return <span>{`${views > 0 ? views.toLocaleString() : '––'} views`}</span>
}
