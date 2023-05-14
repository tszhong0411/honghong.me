import { NextResponse } from 'next/server'

import { WakatimeRes } from '@/types'

export const GET = async () => {
  const res = await fetch(
    'https://wakatime.com/api/v1/users/current/all_time_since_today',
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.WAKATIME_API_KEY as string
        ).toString('base64')}`,
      },
      next: {
        revalidate: 60,
      },
    }
  )

  const data: WakatimeRes = await res.json()

  return NextResponse.json({
    seconds: data.data.total_seconds,
  })
}
