import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json(
      {
        error: 'Slug is required.'
      },
      { status: 400 }
    )
  }

  const comments = await prisma.comment.count({
    where: {
      Post: {
        slug
      }
    }
  })

  return NextResponse.json({
    comments
  })
}
