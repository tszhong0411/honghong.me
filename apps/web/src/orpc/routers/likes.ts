import { ORPCError } from '@orpc/client'
import { eq, likesSessions, posts, sql } from '@tszhong0411/db'

import { getIp } from '@/utils/get-ip'
import { getSessionId } from '@/utils/get-session-id'

import { publicProcedure } from '../root'
import { getLikeInputSchema, incrementLikeInputSchema, likeSchema } from '../schemas/likes'

export const getLike = publicProcedure
  .route({
    method: 'GET',
    path: '/posts/{slug}/likes',
    summary: 'Get like',
    tags: ['Likes']
  })
  .input(getLikeInputSchema)
  .output(likeSchema)
  .handler(async ({ input, context }) => {
    const ip = getIp(context.headers)
    const sessionId = getSessionId(input.slug, ip)

    const [post, user] = await Promise.all([
      context.db
        .select({
          likes: posts.likes
        })
        .from(posts)
        .where(eq(posts.slug, input.slug)),
      context.db
        .select({
          likes: likesSessions.likes
        })
        .from(likesSessions)
        .where(eq(likesSessions.id, sessionId))
    ])

    return {
      likes: post[0]?.likes ?? 0,
      currentUserLikes: user[0]?.likes ?? 0
    }
  })

export const incrementLike = publicProcedure
  .route({
    method: 'POST',
    path: '/posts/{slug}/likes',
    summary: 'Increment like',
    tags: ['Likes']
  })
  .input(incrementLikeInputSchema)
  .output(likeSchema)
  .handler(async ({ input, context }) => {
    const ip = getIp(context.headers)
    const sessionId = getSessionId(input.slug, ip)

    const session = await context.db
      .select({
        likes: likesSessions.likes
      })
      .from(likesSessions)
      .where(eq(likesSessions.id, getSessionId(input.slug, ip)))

    if (session[0] && session[0].likes + input.value > 3) {
      throw new ORPCError('BAD_REQUEST', {
        message: 'You can only like a post 3 times'
      })
    }

    const [post] = await context.db
      .insert(posts)
      .values({
        slug: input.slug,
        likes: input.value
      })
      .onConflictDoUpdate({
        target: posts.slug,
        set: {
          likes: sql<number>`${posts.likes} + ${input.value}`
        }
      })
      .returning()

    const [currentUserLikes] = await context.db
      .insert(likesSessions)
      .values({
        id: sessionId,
        likes: input.value
      })
      .onConflictDoUpdate({
        target: likesSessions.id,
        set: {
          likes: sql<number>`${likesSessions.likes} + ${input.value}`
        }
      })
      .returning()

    if (!post || !currentUserLikes) {
      throw new ORPCError('INTERNAL_SERVER_ERROR', {
        message: 'Failed to increment like'
      })
    }

    return {
      likes: post.likes,
      currentUserLikes: currentUserLikes.likes
    }
  })
