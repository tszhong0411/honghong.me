import { rest } from 'msw'

import { visitors } from './analytics'
import { song } from './spotify'

export const handlers = [
  rest.get('http://localhost:3000/api/spotify', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(song))
  ),

  rest.get('http://localhost:3000/api/analytics', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(visitors))
  )
]
