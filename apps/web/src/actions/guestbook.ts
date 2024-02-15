'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { env } from '@/env'
import prisma from '@/lib/prisma'
import getErrorMessage from '@/utils/get-error-message'

import { privateAction } from './private-action'

export const deleteMessage = (id: number) =>
  privateAction(async (user) => {
    const email = user.email

    const message = await prisma.guestbook.findUnique({
      where: {
        id
      },
      select: {
        email: true
      }
    })

    if (!message) {
      return {
        message: 'Message not found',
        error: true
      }
    }

    if (message.email !== email) {
      return {
        message: 'Unauthorized',
        error: true
      }
    }

    try {
      await prisma.guestbook.delete({
        where: {
          id
        }
      })
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    revalidatePath('/guestbook')
    return {
      message: 'Deleted a message.'
    }
  })

export const createMessage = (formData: FormData) =>
  privateAction(async (user) => {
    const schema = z.object({
      message: z.string().min(1, {
        message: 'Message is required.'
      })
    })

    const parsed = schema.safeParse({
      message: formData.get('message') ?? ''
    })

    if (!parsed.success) {
      return {
        message: parsed.error.issues[0]!.message,
        error: true
      }
    }

    const { message } = parsed.data
    const email = user.email as string
    const name = user.name as string
    const image = user.image as string

    try {
      await prisma.guestbook.create({
        data: {
          email,
          body: message,
          image,
          created_by: name
        }
      })
    } catch (error) {
      return {
        message: getErrorMessage(error),
        error: true
      }
    }

    if (process.env.NODE_ENV === 'production') {
      await fetch(env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: null,
          embeds: [
            {
              title: 'New comment!',
              description: message,
              url: 'https://honghong.me/guestbook',
              color: '6609519',
              author: {
                name,
                icon_url: image
              },
              timestamp: new Date().toISOString()
            }
          ],
          username: 'Blog',
          avatar_url:
            'https://cdn.discordapp.com/avatars/1123845082672537751/8af603a10f1d2f86ebc922ede339cd3a.webp',
          attachments: []
        })
      })
    }

    revalidatePath('/guestbook')
    return {
      message: 'Created a message.'
    }
  })
