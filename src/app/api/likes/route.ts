import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('slug')

  if (!slug) {
    const likes = await prisma.post.aggregate({
      _sum: {
        likes: true,
      },
    })

    return NextResponse.json({
      likes: likes._sum.likes ?? 0,
    })
  }

  const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0'
  const currentUserId = createHash('md5')
    .update(ipAddress + process.env.IP_ADDRESS_SALT, 'utf8')
    .digest('hex')
  const sessionId = slug + '___' + currentUserId

  const [post, user] = await Promise.all([
    prisma.post.findUnique({
      where: { slug },
    }),

    prisma.session.findUnique({
      where: { id: sessionId },
    }),
  ])

  if (!post) {
    return NextResponse.json(
      {
        error: 'Post not found',
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    likes: post.likes ?? 0,
    currentUserLikes: user?.likes ?? 0,
  })
}

export const POST = async (req: Request) => {
  const { count, slug } = await req.json()

  const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0'
  const currentUserId = createHash('md5')
    .update(ipAddress + process.env.IP_ADDRESS_SALT, 'utf8')
    .digest('hex')
  const sessionId = slug + '___' + currentUserId

  if (!slug || typeof count !== 'number' || count < 0 || count > 3) {
    return NextResponse.json(
      {
        error: 'Invalid count or slug is missing',
      },
      { status: 400 }
    )
  }

  try {
    const [post, user] = await Promise.all([
      prisma.post.upsert({
        where: { slug },
        create: {
          slug,
          likes: count,
        },
        update: {
          likes: {
            increment: count,
          },
        },
      }),

      prisma.session.upsert({
        where: { id: sessionId },
        create: {
          id: sessionId,
          likes: count,
        },
        update: {
          likes: {
            increment: count,
          },
        },
      }),
    ])

    return NextResponse.json({
      likes: post?.likes || 0,
      currentUserLikes: user?.likes || 0,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      { status: 500 }
    )
  }
}
