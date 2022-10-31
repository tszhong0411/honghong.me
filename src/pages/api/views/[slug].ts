import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = z.string().parse(req.query.slug)

    if (req.method === 'POST') {
      const post = await prisma.post.upsert({
        where: { slug },
        create: {
          slug,
        },
        update: {
          views: {
            increment: 1,
          },
        },
      })

      return res.status(200).json({
        total: post.views,
      })
    }

    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
      })

      return res.status(200).json({ total: post.views })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
