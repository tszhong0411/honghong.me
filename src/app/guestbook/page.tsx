import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import PageTitle from '@/components/page-title'

import { site } from '@/config/site'

import { getMessages } from './actions'
import Form from './form'
import Messages from './messages'
import Pinned from './pinned'
import SignIn from './sign-in'

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
  const messages = await getMessages()

  return (
    <>
      <PageTitle
        title='Guestbook'
        description='You can tell me anything here!'
      />
      <div className='mx-auto max-w-lg'>
        <Pinned />
        {!session?.user && <SignIn />}
        {session?.user && <Form user={session.user} />}
        <Messages user={session?.user} messages={messages} />
      </div>
    </>
  )
}

export default GuestbookPage
