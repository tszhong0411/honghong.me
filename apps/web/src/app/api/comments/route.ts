import { count, eq } from 'drizzle-orm'
import { unstable_noStore as noStore } from 'next/cache'
import { NextResponse } from 'next/server'

import { db } from '@/db'
import { comments } from '@/db/schema'

export const runtime = 'edge'

export const GET = async (req: Request) => {
  noStore()

  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json(
      {
        error: 'Slug is required'
      },
      { status: 400 }
    )
  }

  const res = await db
    .select({
      value: count()
    })
    .from(comments)
    .where(eq(comments.postId, slug))

  return NextResponse.json({
    value: res[0]?.value ?? 0
  })
}
