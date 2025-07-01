import { commentsRouter } from './comments'
import { githubRouter } from './github'
import { guestbookRouter } from './guestbook'
import { likesRouter } from './likes'
import { ratesRouter } from './rates'
import { spotifyRouter } from './spotify'
import { usersRouter } from './users'
import { viewsRouter } from './views'
import { wakatimeRouter } from './wakatime'
import { youtubeRouter } from './youtube'

export const router = {
  github: githubRouter,
  youtube: youtubeRouter,
  wakatime: wakatimeRouter,
  views: viewsRouter,
  likes: likesRouter,
  spotify: spotifyRouter,
  comments: commentsRouter,
  guestbook: guestbookRouter,
  rates: ratesRouter,
  users: usersRouter
}
