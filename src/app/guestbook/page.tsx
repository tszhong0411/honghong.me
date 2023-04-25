import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import PageTitle from '@/components/PageTitle'

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
      <PageTitle
        title='Guestbook'
        description='You can tell me anything here!'
      />
      <Guestbook user={session?.user} />
    </>
  )
}

export default GuestbookPage
