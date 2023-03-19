import type { Metadata } from 'next'
import { getServerSession, Session } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import Guestbook from '@/components/Guestbook'

import { site } from '@/config/site'

import { Messages } from '@/types'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: '在我的留言簿上簽名並分享您的想法。',
  alternates: {
    canonical: `${site.url}/guestbook`,
  },
}

export const dynamic = 'force-dynamic'

const getMessages = async () => {
  const messages = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  return messages.map((message) => ({
    id: message.id,
    body: message.body,
    image: message.image,
    created_by: message.created_by,
    updated_at: message.updated_at,
  }))
}

const GuestbookPage = async () => {
  let entries: Messages | undefined
  let session: Session | null | undefined

  try {
    const [guestbookRes, sessionRes] = await Promise.allSettled([
      getMessages(),
      getServerSession(authOptions),
    ])

    if (guestbookRes.status === 'fulfilled' && guestbookRes.value[0]) {
      const formattedEntries = guestbookRes.value.map((entry) => ({
        ...entry,
        id: entry.id.toString(),
        updated_at: entry.updated_at.toISOString(),
      }))

      entries = formattedEntries
    } else {
      // eslint-disable-next-line no-console
      console.error(guestbookRes)
    }

    if (sessionRes.status === 'fulfilled') {
      session = sessionRes.value
    } else {
      // eslint-disable-next-line no-console
      console.error(sessionRes)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Guestbook</h2>
      <p className='mb-8 text-accent-5'>你可以在這裡告訴我任何事情！</p>
      <Guestbook user={session?.user} messages={entries} />
    </>
  )
}

export default GuestbookPage
