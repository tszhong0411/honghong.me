import useSWR, { SWRConfiguration } from 'swr'

const API_URL = `/api/views`

async function getPostViews(slug: string): Promise<{ total: number }> {
  const res = await fetch(API_URL + `/${slug}`)
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return res.json()
}

async function updatePostViews(slug: string): Promise<{ total: number }> {
  const res = await fetch(API_URL + `/${slug}`, { method: 'POST' })
  if (!res.ok) {
    throw new Error('An error occurred while posting the data.')
  }
  return res.json()
}

export const usePostViews = (slug: string, config?: SWRConfiguration) => {
  const {
    data: views,
    error,
    mutate,
  } = useSWR<{ total: number }>([API_URL, slug], () => getPostViews(slug), {
    dedupingInterval: 60000,
    ...config,
  })

  const increment = () => {
    mutate(
      updatePostViews(slug).catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)

        return { total: 0 }
      })
    )
  }

  return {
    views,
    isLoading: !error && !views,
    isError: !!error,
    increment,
  }
}
