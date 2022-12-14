import React from 'react'
import { useDebounce } from 'react-use'
import useSWR, { SWRConfiguration } from 'swr'

type LikesPayload = {
  likes: number
  currentUserLikes: number
}

const getPostLikes = async (slug: string): Promise<LikesPayload> => {
  const res = await fetch(`/api/likes/${slug}`)

  return res.json()
}

const updatePostLikes = async (
  slug: string,
  count: number
): Promise<LikesPayload> => {
  const res = await fetch(`/api/likes/${slug}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
  })

  return res.json()
}

export const usePostLikes = (slug: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR(
    ['/api/likes', slug],
    () => getPostLikes(slug),
    {
      dedupingInterval: 60000,
      ...config,
    }
  )

  const [batchedLikes, setBatchedLikes] = React.useState(0)

  const increment = () => {
    if (!data || data.currentUserLikes >= 3) {
      return
    }

    mutate(
      {
        likes: data.likes + 1,
        currentUserLikes: data.currentUserLikes + 1,
      },
      false
    )

    setBatchedLikes(batchedLikes + 1)
  }

  useDebounce(
    () => {
      if (batchedLikes === 0) return

      mutate(updatePostLikes(slug, batchedLikes))
      setBatchedLikes(0)
    },
    1000,
    [batchedLikes]
  )

  return {
    currentUserLikes: data?.currentUserLikes,
    likes: data?.likes,
    isLoading: !error && !data,
    isError: !!error,
    increment,
  }
}
