import { google } from 'googleapis'
import { NextResponse } from 'next/server'

import googleAuth from '@/lib/google'

export const GET = async () => {
  const auth = await googleAuth.getClient()
  const youtube = google.youtube({
    auth,
    version: 'v3',
  })

  const response = await youtube.channels.list({
    id: ['UC2hMWOaOlk9vrkvFVaGmn0Q'],
    part: ['statistics'],
  })

  if (!response.data || !response.data.items) {
    throw new Error('Response data or items are undefined')
  }

  const channel = response.data.items[0]
  const statistics = channel.statistics

  if (!statistics) {
    throw new Error('Statistics not found')
  }

  return NextResponse.json({
    subscribers: Number(statistics.subscriberCount),
    views: Number(statistics.viewCount),
  })
}
