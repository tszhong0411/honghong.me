// Blog
export type Views = {
  views: number
}

export type Likes = {
  likes: number
  currentUserLikes: number
}

export type BlogData = Views & Pick<Likes, 'likes'>

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

// YouTube
export type YouTubeData = {
  subscribers: number
  views: number
}

// Github
export type GithubData = {
  stars: number
  followers: number
}

// Wakatime
export type WakatimeRes = {
  data: {
    decimal: string
    digital: string
    is_up_to_date: boolean
    percent_calculated: number
    range: {
      end: string
      end_date: string
      end_text: string
      start: string
      start_date: string
      start_text: string
      timezone: string
    }
    text: string
    timeout: number
    total_seconds: number
  }
}

export type WakatimeData = {
  seconds: number
}
