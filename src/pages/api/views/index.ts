import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const totalViews = await prisma.post.aggregate({
      _sum: {
        views: true,
      },
    })

    return res.status(200).json({ views: totalViews._sum.views })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

export default handler
