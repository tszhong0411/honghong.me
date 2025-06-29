import { initTRPC, TRPCError } from '@trpc/server'
import { db } from '@tszhong0411/db'
import { headers } from 'next/headers'
import { cache } from 'react'
import { SuperJSON } from 'superjson'
import { ZodError } from 'zod'

import { getSession } from '@/lib/auth'

export const createTRPCContext = cache(async () => {
  const session = await getSession()

  return {
    db,
    session,
    headers: await headers()
  }
})

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

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
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
