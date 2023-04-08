import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import { site } from '@/config/site'

import Guestbook from './guestbook'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and share your idea.',
  alternates: {
    canonical: `${site.url}/guestbook`,
  },
}

export const dynamic = 'force-dynamic'

const GuestbookPage = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Guestbook</h2>
      <p className='mb-8 text-accent-5'>You can tell me anything here!</p>
      <Guestbook user={session?.user} />
    </>
  )
}

export default GuestbookPage
