import { NextResponse } from 'next/server'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export const GET = async () => {
  try {
    const authRes = await fetch(
      `${process.env.NEXT_PUBLIC_UMAMI_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: process.env.UMAMI_USERNAME,
          password: process.env.UMAMI_PASSWORD,
        }),
      },
    )

    const { token } = await authRes.json()

    const statsRes = await fetch(
      `${process.env.NEXT_PUBLIC_UMAMI_URL}/api/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}/active`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const data = await statsRes.json()
    const { x: visitors } = data[0]

    return NextResponse.json({
      visitors,
    })
  } catch {
    return NextResponse.json(
      {
        error: 'Error getting analytics stats',
      },
      {
        status: 500,
      },
    )
  }
}
