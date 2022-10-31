import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const totalLikes = await prisma.post.aggregate({
      _sum: {
        likes: true,
      },
    })

    return res.status(200).json({ total: totalLikes._sum.likes })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
