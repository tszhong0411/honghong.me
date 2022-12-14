import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export const useNowPlaying = () => {
  const { data, error } = useSWR<NowPlayingSong>('/api/now-playing', fetcher)

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  }
}
