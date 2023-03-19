import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '@/lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const entry = await prisma.guestbook.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!entry) {
    return res.status(404).send('Entry not found')
  }

  if (req.method === 'GET') {
    return res.json({
      id: entry.id.toString(),
      body: entry.body,
      created_by: entry.created_by,
      updated_at: entry.updated_at,
    })
  }

  const session = await getSession({ req })

  if (!session || session?.user?.email !== entry.email) {
    return res.status(403).send('Unauthorized')
  }

  if (req.method === 'DELETE') {
    await prisma.guestbook.delete({
      where: {
        id: Number(id),
      },
    })

    return res.status(204).end()
  }

  if (req.method === 'PUT') {
    const body = (req.body.body || '').slice(0, 500)

    await prisma.guestbook.update({
      where: {
        id: Number(id),
      },
      data: {
        body,
        updated_at: new Date().toISOString(),
      },
    })

    return res.status(201).json({
      ...entry,
      body,
    })
  }

  return res.send('Method not allowed.')
}

export default handler
