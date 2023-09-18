import { rest } from 'msw'

import { visitors } from './analytics'
import { song } from './spotify'

export const handlers = [
  rest.get('/api/spotify', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(song))
  ),

  rest.get('/api/analytics', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(visitors))
  )
]
