export type Views = {
  views: number
}

export type Likes = {
  likes: number
  currentUserLikes: number
}

export type Message = {
  id: number
  body: string
  image: string
  created_by: string
  updated_at: Date
}

export type Song =
  | {
      isPlaying: true
      name: string
      artist: string
      album: string
      albumImage: string
      songUrl: string
    }
  | {
      isPlaying: false
    }

export type YouTube = {
  subscribers: number
  views: number
}

export type Github = {
  stars: number
  followers: number
}

export type Wakatime = {
  seconds: number
}

export type Analytics = {
  visitors: number
}
