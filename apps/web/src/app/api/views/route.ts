import { eq, sql, sum } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'

import { db } from '@/db'
import { posts } from '@/db/schema'

export const GET = async (req: Request) => {
  noStore()

  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    const views = await db
      .select({
        value: sum(posts.views)
      })
      .from(posts)

    return NextResponse.json({
      views: views[0]?.value ?? 0
    })
  }

  const post = await db
    .select({
      views: posts.views
    })
    .from(posts)
    .where(eq(posts.slug, slug))

  if (!post[0]) {
    return NextResponse.json(
      {
        error: 'Post not found'
      },
      { status: 404 }
    )
  }

  return NextResponse.json({
    views: post[0].views
  })
}

export const POST = async (req: Request) => {
  const { slug } = (await req.json()) as {
    slug: string | null
  }

  if (!slug) {
    return NextResponse.json(
      {
        error: 'Slug is required'
      },
      { status: 400 }
    )
  }

  await db
    .insert(posts)
    .values({
      slug: slug,
      views: 1
    })
    .onConflictDoUpdate({
      target: posts.slug,
      set: {
        views: sql<number>`${posts.views} + 1`
      }
    })

  return NextResponse.json({
    error: null
  })
}
