import { type Song } from '@/types'

export const song: Song = {
  isPlaying: true,
  name: 'Up All Night',
  artist: 'Rewind, Julia Alexa',
  album: 'Up All Night',
  albumImage:
    'https://i.scdn.co/image/ab67616d0000b2730a6dec4718ad7481a157797a',
  songUrl: 'https://open.spotify.com/track/2sRfqd7xfEBUQWVqTp9zM6'
}

export const songPaused: Song = {
  isPlaying: false
}
