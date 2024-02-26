import { eq, sql, sum } from 'drizzle-orm'
import { sha512 } from 'js-sha512'
import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { db } from '@/db'
import { likesSessions, posts } from '@/db/schema'
import { env } from '@/env'
import { getErrorMessage } from '@/utils/get-error-message'

export const runtime = 'edge'

const schema = z.object({
  slug: z.string(),
  value: z.number().int().positive().min(1).max(3)
})

const getSessionId = (slug: string, req: Request): string => {
  const ipAddress = req.headers.get('x-forwarded-for') ?? '0.0.0.0'
  const currentUserId = sha512(ipAddress + env.IP_ADDRESS_SALT)

  return `${slug}___${currentUserId}`
}

export const GET = async (req: Request) => {
  noStore()

  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    const res = await db
      .select({
        value: sum(likesSessions.likes)
      })
      .from(posts)

    return NextResponse.json({
      likes: res[0]?.value ?? 0
    })
  }

  const [post, user] = await Promise.all([
    db
      .select({
        likes: posts.likes
      })
      .from(posts)
      .where(eq(posts.slug, slug)),
    db
      .select({
        likes: likesSessions.likes
      })
      .from(likesSessions)
      .where(eq(likesSessions.id, getSessionId(slug, req)))
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
    likes: post[0]?.likes ?? 0,
    currentUserLikes: user[0]?.likes ?? 0
  })
}

export const PATCH = async (req: Request) => {
  const request = schema.safeParse(await req.json())

  if (!request.success) {
    return NextResponse.json(
      {
        error: `Invalid request: ${request.error.issues[0]!.message}`
      },
      { status: 400 }
    )
  }

  const {
    data: { slug, value }
  } = request

  try {
    const session = await db
      .select({
        likes: likesSessions.likes
      })
      .from(likesSessions)
      .where(eq(likesSessions.id, getSessionId(slug, req)))

    if (session[0] && session[0].likes + value > 3) {
      throw new Error('You can only like a post 3 times')
    }

    await db
      .insert(posts)
      .values({
        slug,
        likes: value
      })
      .onDuplicateKeyUpdate({
        set: {
          likes: sql<number>`${posts.likes} + ${value}`
        }
      })

    await db
      .insert(likesSessions)
      .values({
        id: getSessionId(slug, req),
        likes: value
      })
      .onDuplicateKeyUpdate({
        set: {
          likes: sql<number>`${likesSessions.likes} + 1`
        }
      })

    const post = await db
      .select({
        likes: posts.likes
      })
      .from(posts)
      .where(eq(posts.slug, slug))

    const likesSession = await db
      .select({
        likes: likesSessions.likes
      })
      .from(likesSessions)
      .where(eq(likesSessions.id, getSessionId(slug, req)))

    return NextResponse.json({
      likes: post[0]?.likes ?? 0,
      currentUserLikes: likesSession[0]?.likes ?? 0
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: getErrorMessage(error)
      },
      { status: 500 }
    )
  }
}
