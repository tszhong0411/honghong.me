import { and, desc, guestbook, lt } from '@tszhong0411/db'
import { z } from 'zod'

import { publicProcedure } from '@/orpc/root'
import { getDefaultImage } from '@/utils/get-default-image'

export const getInfiniteMessages = publicProcedure
  .input(
    z.object({
      cursor: z.date().nullish(),
      limit: z.number().min(1).max(50).default(10)
    })
  )
  .handler(async ({ input, context }) => {
    const query = await context.db.query.guestbook.findMany({
      where: and(input.cursor ? lt(guestbook.createdAt, input.cursor) : undefined),
      limit: input.limit,
      with: {
        user: {
          columns: {
            name: true,
            image: true,
            id: true
          }
        }
      },
      orderBy: desc(guestbook.updatedAt)
    })

    const result = query.map((message) => {
      const defaultImage = getDefaultImage(message.user.id)

      return {
        ...message,
        user: {
          ...message.user,
          name: message.user.name,
          image: message.user.image ?? defaultImage
        }
      }
    })

    return {
      messages: result,
      nextCursor: result.at(-1)?.updatedAt ?? null
    }
  })
