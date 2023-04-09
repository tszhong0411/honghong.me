import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import { site } from '@/config/site'

import Guestbook from './guestbook'

const title = 'Guestbook'
const description = 'Sign my guestbook and share your idea.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${site.url}/guestbook`,
  },
  openGraph: {
    url: `${site.url}/guestbook`,
    type: 'website',
    title,
    siteName: site.title,
    description,
    locale: 'en-US',
    images: [
      {
        url: `${site.url}/static/images/og/og.png`,
        width: 1200,
        height: 630,
        alt: description,
        type: 'image/png',
      },
    ],
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
