import { redis, redisKeys } from '@tszhong0411/kv'
import { Server } from 'socket.io'

const io = new Server(3003, {
  cors: {
    origin: ['http://localhost:3000', 'https://honghong.me'],
    methods: ['GET', 'POST']
  }
})

const key = redisKeys.socketSessions

io.on('connection', async (socket) => {
  const querySessionId = socket.handshake.query['socket-session-id']
  const sessionId =
    (Array.isArray(querySessionId) ? querySessionId[0] : querySessionId) ?? socket.id

  await redis.sadd(key, sessionId)
  const count = await redis.scard(key)

  io.emit('visitor_count', count)

  socket.on('disconnect', async () => {
    await redis.srem(key, sessionId)
    const newCount = await redis.scard(key)

    io.emit('visitor_count', newCount)
  })
})

console.log('Socket server is running on port 3003')
