import { rest } from 'msw'

import { visitors } from './analytics'
import { song } from './spotify'

export const handlers = [
  rest.get('/api/spotify', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(song))
  ),

  rest.get('/api/analytics', (_, res, ctx) =>
    res(ctx.status(200), ctx.json(visitors))
  ),

  rest.get('/api/views', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        views: 0
      })
    )
  ),

  rest.get('/api/likes', (_, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        likes: 0,
        currentUserLikes: 0
      })
    )
  )
]
