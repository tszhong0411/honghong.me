export type Views = {
  views: number
}

export type Likes = {
  likes: number
  currentUserLikes: number
}

export type Comments = {
  value: number
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
