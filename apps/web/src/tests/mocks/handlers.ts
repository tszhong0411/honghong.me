import { http } from 'msw'

import { currentVisitors } from './analytics'
import { song } from './spotify'

export const handlers = [
  http.get('/api/spotify', () => Response.json(song)),

  http.get('/api/analytics', () => Response.json(currentVisitors)),

  http.get('/api/views', () =>
    Response.json({
      views: 0
    })
  ),

  http.get('/api/likes', () =>
    Response.json({
      likes: 0,
      currentUserLikes: 0
    })
  )
]
