export type Toc = {
  value: string
  depth: number
  url: string
}[]

export type Github = {
  stars: number
  followers: number
}

export type YouTube = {
  subscriberCount: number
  viewCount: number
}

export type Views = {
  total: number
}

export type NowPlayingSong = {
  album: string
  albumImageUrl: string
  artist: string
  isPlaying: boolean
  songUrl: string
  title: string
}

export type Song = {
  songUrl: string
  artist: string
  title: string
}

export type TopTracks = {
  tracks: Song[]
}
