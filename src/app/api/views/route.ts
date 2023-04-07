import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    const views = await prisma.post.aggregate({
      _sum: {
        views: true,
      },
    })

    return NextResponse.json({
      views: views._sum.views ?? 0,
    })
  }

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  })

  if (!post) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    views: post.views,
  })
}

export const POST = async (req: Request) => {
  const { slug } = await req.json()

  if (!slug) {
    return NextResponse.json(
      {
        error: 'Slug is required',
      },
      { status: 400 }
    )
  }

  await prisma.post.upsert({
    where: {
      slug,
    },
    create: {
      slug,
    },
    update: {
      views: {
        increment: 1,
      },
    },
  })

  return NextResponse.json({
    error: null,
  })
}
