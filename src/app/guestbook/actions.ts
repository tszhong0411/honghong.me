'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const deleteMessage = async (id: number) => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email as string

  const message = await prisma.guestbook.findUnique({
    where: {
      id,
    },
  })

  if (!message) {
    throw new Error('Message not found')
  }

  if (message.email !== email) {
    throw new Error('Unauthorized')
  }

  await prisma.guestbook.delete({
    where: {
      id,
    },
  })

  revalidatePath('/guestbook')
}

export const createMessage = async (message: string) => {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email as string
  const name = session?.user?.name as string
  const image = session?.user?.image as string

  if (!message) {
    throw new Error('Message cannot be empty')
  }

  await prisma.guestbook.create({
    data: {
      email,
      body: message,
      image,
      created_by: name,
    },
  })

  if (process.env.NODE_ENV === 'production') {
    await fetch(process.env.DISCORD_WEBHOOK_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: null,
        embeds: [
          {
            title: 'New comment!',
            description: message,
            url: 'https://honghong.me/guestbook',
            color: 122210,
            author: {
              name: name,
              icon_url: image,
            },
            timestamp: new Date().toISOString(),
          },
        ],
        username: 'Blog',
        avatar_url: 'https://honghong.me/static/images/projects/blog/logo.png',
        attachments: [],
      }),
    })
  }

  revalidatePath('/guestbook')
}

export const getMessages = async () => {
  const messages = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  return messages.map((message) => {
    const { id, body, image, created_by, updated_at } = message

    return {
      id: Number(id),
      body,
      image,
      created_by,
      updated_at,
    }
  })
}
