// Blog
export type Views = {
  views: number
}
export type Likes = {
  likes: number
  currentUserLikes: number
}

// Guestbook
export type Messages = {
  id: number
  body: string
  image: string
  created_by: string
  updated_at: string
}[]

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
