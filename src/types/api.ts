// Dashboard
export type APIResponse = {
  count: number
}

// Spotify
export type Song = {
  isPlaying?: boolean
  name: string
  artist: string
  album: string
  albumImage: string
  songUrl: string
}
