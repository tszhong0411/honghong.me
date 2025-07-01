import { env } from '@tszhong0411/env'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'

export const getStats = publicProcedure
  .output(
    z.object({
      seconds: z.number()
    })
  )
  .handler(async () => {
    const res = await fetch('https://wakatime.com/api/v1/users/current/all_time_since_today', {
      headers: {
        Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString('base64')}`
      }
    })

    const {
      data: { total_seconds }
    } = await res.json()

    return {
      seconds: total_seconds as number
    }
  })
