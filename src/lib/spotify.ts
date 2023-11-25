import { env } from '@/env'

const CLIENT_ID = env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
const NOW_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN
    })
  })

  const data = await response.json()

  return data.access_token as string
}

const getNowPlaying = async () => {
  const accessToken = await getAccessToken()

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    next: {
      revalidate: 60
    }
  })

  if (response.status === 204) {
    return {
      status: response.status
    }
  }

  try {
    const song = await response.json()

    return {
      status: response.status,
      data: song
    }
  } catch {
    return {
      status: response.status
    }
  }
}

export default getNowPlaying
