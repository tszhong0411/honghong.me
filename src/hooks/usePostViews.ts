import React from 'react'
import useSWR, { mutate } from 'swr'

const API_URL = `/api/views/`

type ViewsPayload = {
  views: number | undefined
}

const getPostViews = async (slug: string): Promise<ViewsPayload> => {
  const res = await fetch(API_URL + slug)

  return res.json()
}

const updatePostViews = async (slug: string): Promise<ViewsPayload> => {
  const res = await fetch(API_URL + slug, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()

  return {
    views: data.views,
  }
}

export const usePostViews = (slug: string) => {
  const { data, error } = useSWR(
    slug ? `${slug}/views` : null,
    () => getPostViews(slug),
    {
      revalidateOnFocus: false,
    }
  )

  const increment = React.useCallback(() => {
    mutate(`${slug}/views`, updatePostViews(slug))
  }, [slug])

  return {
    views: data?.views,
    isLoading: !error && !data,
    isError: !!error,
    increment,
  }
}
