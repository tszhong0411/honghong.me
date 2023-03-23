import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const GET = async () => {
  const views = await prisma.post.aggregate({
    _sum: {
      views: true,
    },
  })

  return NextResponse.json({
    count: views._sum.views ?? 0,
  })
}
