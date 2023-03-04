import type { Metadata } from 'next'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/session'

import Guestbook from '@/components/Guestbook'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: '在我的留言簿上簽名並分享您的想法。',
  alternates: {
    canonical: `${site.url}/guestbook`,
  },
}

const getMessages = async () => {
  const messages = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  return messages.map((message) => ({
    id: message.id.toString(),
    body: message.body,
    image: message.image,
    created_by: message.created_by,
    updated_at: message.updated_at.toString(),
  }))
}

const GuestbookPage = async () => {
  const user = await getCurrentUser()
  const messages = await getMessages()

  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Guestbook</h2>
      <p className='mb-8 text-accent-5'>你可以在這裡告訴我任何事情！</p>
      <Guestbook user={user} messages={messages} />
    </>
  )
}

export default GuestbookPage
