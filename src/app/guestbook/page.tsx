import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import { site } from '@/config/site'

import Guestbook from './guestbook'

export const metadata: Metadata = {
  title: 'Guestbook',
  description: '在我的留言簿上簽名並分享您的想法。',
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
      <p className='mb-8 text-accent-5'>你可以在這裡告訴我任何事情！</p>
      <Guestbook user={session?.user} />
    </>
  )
}

export default GuestbookPage
