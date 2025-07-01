import { and, comments, count, eq, isNotNull } from '@tszhong0411/db'

import { publicProcedure } from '../root'
import { countRepliesInputSchema, countRepliesSchema } from '../schemas/replies'

export const countReplies = publicProcedure
  .route({
    method: 'GET',
    path: '/posts/{slug}/replies/count',
    summary: 'Count replies',
    tags: ['Replies']
  })
  .input(countRepliesInputSchema)
  .output(countRepliesSchema)
  .handler(async ({ input, context }) => {
    const [result] = await context.db
      .select({
        value: count()
      })
      .from(comments)
      .where(and(eq(comments.postId, input.slug), isNotNull(comments.parentId)))

    return {
      count: result?.value ?? 0
    }
  })
