import { initTRPC, TRPCError } from '@trpc/server'
import { db } from '@tszhong0411/db'
import { SuperJSON } from 'superjson'
import { ZodError } from 'zod'

import { auth } from '@/lib/auth'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth()

  return {
    db,
    session,
    ...opts
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    }
  }
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  })
})
