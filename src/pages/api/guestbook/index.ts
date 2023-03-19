import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const entries = await prisma.guestbook.findMany({
      orderBy: {
        updated_at: 'desc',
      },
    })

    return res.json(
      entries.map(({ id, body, image, created_by, updated_at }) => ({
        id: id.toString(),
        body: body,
        image: image,
        created_by: created_by,
        updated_at: updated_at,
      }))
    )
  }

  const session = await getSession({ req })

  if (!session) {
    return res.status(403).send('Unauthorized')
  }

  const email = session?.user?.email as string
  const name = session?.user?.name as string
  const image = session?.user?.image as string

  const { body: content } = req.body

  if (req.method === 'POST') {
    if (!content) {
      return res.status(400).send('留言不能為空')
    }

    const newEntry = await prisma.guestbook.create({
      data: {
        email,
        body: content.slice(0, 500),
        image,
        created_by: name,
      },
    })

    return res.status(200).json({
      id: newEntry.id.toString(),
      body: newEntry.body,
      created_by: newEntry.created_by,
      updated_at: newEntry.updated_at,
    })
  }

  return res.send('Method not allowed.')
}

export default handler
