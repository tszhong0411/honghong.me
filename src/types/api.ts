/**
 * Blog.
 */
export type Views = {
  /**
   * The number of views.
   */
  views: number
}

/**
 * The likes of blog posts.
 */
export type Likes = {
  /**
   * The likes of blog post.
   */
  likes: number
  /**
   * The current user's like.
   */
  currentUserLikes: number
}

/**
 * Guestbook.
 */
export type Message = {
  /**
   * The id of the message.
   */
  id: number
  /**
   * The body of the message.
   */
  body: string
  /**
   * The image of the message.
   */
  image: string
  /**
   * The creator's name of the message.
   */
  created_by: string
  /**
   * The date the message was last updated.
   */
  updated_at: Date
}

/**
 * Spotify.
 */
export type Song =
  | {
      /**
       * The status of the song.
       */
      isPlaying: true
      /**
       * The name of the song.
       */
      name: string
      /**
       * The artist of the song.
       */
      artist: string
      /**
       * The album of the song.
       */
      album: string
      /**
       * The image of the album.
       */
      albumImage: string
      /**
       * The url of the song.
       */
      songUrl: string
    }
  | {
      /**
       * The status of the song.
       */
      isPlaying: false
    }

/**
 * YouTube.
 */
export type YouTube = {
  /**
   * The number of subscribers of the channel.
   */
  subscribers: number
  /**
   * The number of views of the channel.
   */
  views: number
}

/**
 * Github.
 */
export type Github = {
  /**
   * The number of stars of the user.
   */
  stars: number
  /**
   * The number of followers of the user.
   */
  followers: number
}

/**
 * Wakatime.
 */
export type Wakatime = {
  /**
   * The total coding time of the user.
   */
  seconds: number
}

/**
 * Umami Analytics.
 */
export type Analytics = {
  /**
   * The number of visitors.
   */
  visitors: number
}
