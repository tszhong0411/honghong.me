import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'

export const GET = async () => {
  const messages = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  return NextResponse.json(
    messages.map((message) => {
      const { id, body, image, created_by, updated_at } = message

      return {
        id: Number(id),
        body,
        image,
        created_by,
        updated_at,
      }
    })
  )
}

export const POST = async (req: Request) => {
  const session = await getServerSession()
  const { message } = await req.json()

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 403,
      }
    )
  }

  const email = session?.user?.email as string
  const name = session?.user?.name as string
  const image = session?.user?.image as string

  if (!message) {
    return NextResponse.json(
      {
        error: 'Message cannot be empty',
      },
      {
        status: 400,
      }
    )
  }

  await prisma.guestbook.create({
    data: {
      email,
      body: message.slice(0, 500),
      image,
      created_by: name,
    },
  })

  return NextResponse.json({
    error: null,
  })
}

export const DELETE = async (req: Request) => {
  const session = await getServerSession()
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      {
        error: 'Message ID is required',
      },
      {
        status: 400,
      }
    )
  }

  const message = await prisma.guestbook.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!message) {
    return NextResponse.json(
      {
        error: 'Message does not exist',
      },
      {
        status: 404,
      }
    )
  }

  if (!session || session?.user?.email !== message.email) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 403,
      }
    )
  }

  await prisma.guestbook.delete({
    where: {
      id: Number(id),
    },
  })

  return new NextResponse(null, { status: 204 })
}
