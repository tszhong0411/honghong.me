import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
        views: post.views,
      })
    }

    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: {
          slug,
        },
      })

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      return res.status(200).json({ views: post.views })
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export default handler
