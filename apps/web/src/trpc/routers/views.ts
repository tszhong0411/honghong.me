import { TRPCError } from '@trpc/server'
import { eq, posts, sql, sum } from '@tszhong0411/db'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const viewsRouter = createTRPCRouter({
  getCount: publicProcedure.query(async ({ ctx }) => {
    const views = await ctx.db
      .select({
        value: sum(posts.views)
      })
      .from(posts)

    return {
      views: views[0]?.value ? Number(views[0].value) : 0
    }
  }),
  get: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db
        .select({ views: posts.views })
        .from(posts)
        .where(eq(posts.slug, input.slug))

      if (!post[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found'
        })
      }

      return {
        views: post[0].views
      }
    }),
  increment: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(posts)
        .values({
          slug: input.slug,
          views: 1
        })
        .onConflictDoUpdate({
          target: posts.slug,
          set: {
            views: sql<number>`${posts.views} + 1`
          }
        })
    })
})
