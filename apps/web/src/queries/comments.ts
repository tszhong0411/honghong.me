import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { comments } from '@/db/schema'

export const getComments = async (slug: string) => {
  return await db.query.comments.findMany({
    where: eq(comments.postId, slug),
    with: {
      user: true,
      upvotes: true,
      replies: {
        with: {
          user: true
        }
      }
    }
  })
}
