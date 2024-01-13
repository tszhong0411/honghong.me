import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { z } from 'zod'

import { env } from '@/env'
import prisma from '@/lib/prisma'

const schema = z.object({
  slug: z.string(),
  count: z.number().int().positive().min(1).max(3)
})

const getSessionId = (slug: string, req: Request): string => {
  const ipAddress = req.headers.get('x-forwarded-for') ?? '0.0.0.0'
  const currentUserId = createHash('sha512')
    .update(ipAddress + env.IP_ADDRESS_SALT, 'utf8')
    .digest('hex')

  return `${slug}___${currentUserId}`
}

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    const likes = await prisma.post.aggregate({
      _sum: {
        likes: true
      }
    })

    return NextResponse.json({
      likes: likes._sum.likes ?? 0
    })
  }

  const [post, user] = await Promise.all([
    prisma.post.findUnique({
      where: {
        slug
      },
      select: {
        likes: true
      }
    }),

    prisma.likesSession.findUnique({
      where: {
        id: getSessionId(slug, req)
      },
      select: {
        likes: true
      }
    })
  ])

  if (!post) {
    return NextResponse.json(
      {
        error: 'Post not found'
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    likes: post.likes ?? 0,
    currentUserLikes: user?.likes ?? 0
  })
}

export const PATCH = async (req: Request) => {
  const request = schema.safeParse(await req.json())

  if (!request.success) {
    return NextResponse.json(
      {
        error: `Invalid request: ${request.error.issues[0].message}`
      },
      { status: 400 }
    )
  }

  const {
    data: { slug, count }
  } = request

  try {
    const session = await prisma.likesSession.findUnique({
      where: { id: getSessionId(slug, req) },
      select: {
        likes: true
      }
    })

    if (session && session.likes + count > 3) {
      throw new Error('You can only like a post 3 times')
    }

    const [post, user] = await Promise.all([
      prisma.post.upsert({
        where: { slug },
        create: {
          slug,
          likes: count
        },
        update: {
          likes: {
            increment: count
          }
        },
        select: {
          likes: true
        }
      }),

      prisma.likesSession.upsert({
        where: { id: getSessionId(slug, req) },
        create: {
          id: getSessionId(slug, req),
          likes: count
        },
        update: {
          likes: {
            increment: count
          }
        },
        select: {
          likes: true
        }
      })
    ])

    return NextResponse.json({
      likes: post?.likes || 0,
      currentUserLikes: user?.likes || 0
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message
      },
      { status: 500 }
    )
  }
}
