import type { NextRequest } from 'next/server'

import { OpenAPIHandler } from '@orpc/openapi/fetch'

import { createORPCContext } from '@/orpc/context'
import { router } from '@/orpc/routers'

const openAPIHandler = new OpenAPIHandler(router)

const handleRequest = async (request: NextRequest) => {
  const { response } = await openAPIHandler.handle(request, {
    prefix: '/api/openapi',
    context: await createORPCContext(request)
  })

  return response ?? new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest
