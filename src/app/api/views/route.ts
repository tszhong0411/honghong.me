import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    const views = await prisma.post.aggregate({
      _sum: {
        views: true
      }
    })

    return NextResponse.json({
      views: views._sum.views ?? 0
    })
  }

  const post = await prisma.post.findUnique({
    where: {
      slug
    },
    select: {
      views: true
    }
  })

  if (!post) {
    return NextResponse.json(
      {
        error: 'Post not found'
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    views: post.views
  })
}

export const POST = async (req: Request) => {
  const { slug } = (await req.json()) as {
    slug: string
  }

  if (!slug) {
    return NextResponse.json(
      {
        error: 'Slug is required'
      },
      { status: 400 }
    )
  }

  await prisma.post.upsert({
    where: {
      slug
    },
    create: {
      slug
    },
    update: {
      views: {
        increment: 1
      }
    }
  })

  return NextResponse.json({
    error: null
  })
}
