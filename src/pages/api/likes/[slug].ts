/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createHash } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import prisma from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ipAddress =
      req.headers['x-forwarded-for'] ||
      // Fallback for localhost or non Vercel deployments
      '0.0.0.0'

    const slug = z.string().parse(req.query.slug)

    const currentUserId =
      // Since a users IP address is part of the sessionId in our database, we
      // hash it to protect their privacy. By combining it with a salt, we get
      // get a unique id we can refer to, but we won't know what their ip
      // address was.
      createHash('md5')
        .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
        .digest('hex')

    // Identify a specific users interactions with a specific post
    const sessionId = slug + '___' + currentUserId

    switch (req.method) {
      case 'GET': {
        const [post, user] = await Promise.all([
          // get the number of likes this post has
          prisma.post.findUnique({
            where: { slug },
          }),

          // get the number of times the current user has liked this post
          prisma.session.findUnique({
            where: { id: sessionId },
          }),
        ])

        res.json({
          likes: post?.likes || 0,
          currentUserLikes: user?.likes || 0,
        })

        break
      }

      case 'POST': {
        const count = z.number().min(1).max(3).parse(req.body.count)

        // Upsert: if a row exists, update it by incrementing likes. If it
        // doesn't exist, create a new row with the number of likes this api
        // route receives
        const [post, user] = await Promise.all([
          // increment the number of times everyone has liked this post
          prisma.post.upsert({
            where: { slug },
            create: {
              slug,
              likes: count,
            },
            update: {
              likes: {
                increment: count,
              },
            },
          }),

          // increment the number of times this user has liked this post
          prisma.session.upsert({
            where: { id: sessionId },
            create: {
              id: sessionId,
              likes: count,
            },
            update: {
              likes: {
                increment: count,
              },
            },
          }),
        ])

        res.json({
          likes: post?.likes || 0,
          currentUserLikes: user?.likes || 0,
        })

        break
      }

      default: {
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).send('Method Not Allowed')
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.message)

    res.status(500).json({
      statusCode: 500,
      message: err.message,
    })
  }
}
