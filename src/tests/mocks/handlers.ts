import { http } from 'msw'

import { visitors } from './analytics'
import { song } from './spotify'

export const handlers = [
  http.get('/api/spotify', () => Response.json(song)),

  http.get('/api/analytics', () => Response.json(visitors)),

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
