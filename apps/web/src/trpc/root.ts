import { createTRPCRouter } from './init'
import { commentsRouter } from './routers/comments'
import { githubRouter } from './routers/github'
import { guestbookRouter } from './routers/guestbook'
import { likesRouter } from './routers/likes'
import { ratesRouter } from './routers/rates'
import { spotifyRouter } from './routers/spotify'
import { usersRouter } from './routers/users'
import { viewsRouter } from './routers/views'
import { wakatimeRouter } from './routers/wakatime'
import { youtubeRouter } from './routers/youtube'

export const appRouter = createTRPCRouter({
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
})

export type AppRouter = typeof appRouter
