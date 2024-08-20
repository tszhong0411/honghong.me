'use client'

import { env } from '@tszhong0411/env'
import { Tooltip, TooltipContent, TooltipTrigger } from '@tszhong0411/ui'
import { nanoid } from 'nanoid'
import pluralize from 'pluralize'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { SOCKET_SESSION_ID_KEY } from '@/lib/constants'

const defaultSessionId = nanoid(8)

const getSocketSessionId = () => {
  const sessionId = localStorage.getItem(SOCKET_SESSION_ID_KEY)

  if (sessionId) return sessionId

  localStorage.setItem(SOCKET_SESSION_ID_KEY, defaultSessionId)

  return defaultSessionId
}

const VisitorCount = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const socket = io(env.NEXT_PUBLIC_WS_URL, {
      query: {
        'socket-session-id': getSocketSessionId()
      }
    })

    socket.on('visitor_count', (newCount: number) => {
      setCount(newCount)
    })

    return () => {
      socket.off('visitor_count')
    }
  }, [])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='flex items-center gap-2'>
          <div className='size-2.5 animate-pulse rounded-full bg-green-500' />
          <div>{pluralize('visitor', count, true)} online</div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a real-time online user counter</p>
      </TooltipContent>
    </Tooltip>
  )
}

export default VisitorCount
