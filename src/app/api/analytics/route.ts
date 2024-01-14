import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

import { env } from '@/env'
import dayjs from '@/utils/dayjs'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient({
  datasourceUrl: env.UMAMI_DATABASE_URL
})

export const GET = async () => {
  try {
    const result: [
      {
        x: bigint
      }
    ] = await prisma.$queryRaw`
      select count(distinct session_id) x
      from website_event
      where website_id = ${env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      and created_at >= ${dayjs().subtract(5, 'minutes').toISOString()}
    `

    return NextResponse.json({
      visitors: Number(result[0].x)
    })
  } catch {
    return NextResponse.json(
      {
        error: 'Error getting analytics stats'
      },
      {
        status: 500
      }
    )
  }
}
