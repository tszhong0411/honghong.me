import { NextResponse } from 'next/server'

import { env } from '@/env.mjs'
import { WakatimeRes } from '@/types'

export const dynamic = 'force-dynamic'

export const GET = async () => {
  const res = await fetch(
    'https://wakatime.com/api/v1/users/current/all_time_since_today',
    {
      headers: {
        Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString(
          'base64'
        )}`
      }
    }
  )

  const data: WakatimeRes = await res.json()

  return NextResponse.json({
    seconds: data.data.total_seconds
  })
}
