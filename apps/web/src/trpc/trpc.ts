import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

import { initTRPC, TRPCError } from '@trpc/server'
import { db } from '@tszhong0411/db'
import { SuperJSON } from 'superjson'
import { ZodError } from 'zod'

import { auth } from '@/lib/auth'

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await auth()

  return {
    db,
    session,
    headers: opts.req.headers
  }
}

type Context = typeof createContext

const t = initTRPC.context<Context>().create({
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

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }

  return next({ ctx })
})
