import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'

import { getNowPlaying } from '@/lib/spotify'

export const runtime = 'edge'

export const GET = async () => {
  noStore()

  try {
    const response = await getNowPlaying()

    if (
      response.status === 204 ||
      response.status > 400 ||
      response?.data?.item === null ||
      !response.data
    ) {
      return NextResponse.json({ isPlaying: false })
    }

    const song = response.data

    if (song.is_playing === false) {
      return NextResponse.json({ isPlaying: false })
    }

    const isPlaying = song.is_playing
    const name = song.item.name
    const artist = song.item.artists
      .map((_artist: { name: string }) => {
        return _artist.name
      })
      .join(', ')
    const album = song.item.album.name
    const albumImage = song.item.album.images[0].url
    const songUrl = song.item.external_urls.spotify

    return NextResponse.json({
      isPlaying,
      name,
      artist,
      album,
      albumImage,
      songUrl
    })
  } catch {
    return NextResponse.json(
      {
        isPlaying: false,
        message: 'Error getting Now Playing from Spotify'
      },
      { status: 500 }
    )
  }
}
