import type { Metadata, ResolvingMetadata } from 'next'

import { getMessages } from '@/actions/guestbook'
import PageTitle from '@/components/page-title'
import site from '@/config/site'
import { getCurrentUser } from '@/lib/auth'

import Form from './form'
import Messages from './messages'
import Pinned from './pinned'
import SignIn from './sign-in'

const title = 'Guestbook'
const description = 'Sign my guestbook and share your idea.'

type GuestbookPageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: GuestbookPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent)?.openGraph ?? {}
  const previousTwitter = (await parent)?.twitter ?? {}

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/guestbook`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${site.url}/guestbook`,
      title,
      description
    },
    twitter: {
      ...previousTwitter,
      title,
      description
    }
  }
}

export const dynamic = 'force-dynamic'

const GuestbookPage = async () => {
  const user = await getCurrentUser()
  const messages = await getMessages()

  return (
    <>
      <PageTitle
        title='Guestbook'
        description='You can tell me anything here!'
      />
      <div className='mx-auto max-w-lg'>
        <Pinned />
        {!user && <SignIn />}
        {user && <Form user={user} />}
        <Messages user={user ?? undefined} messages={messages} />
      </div>
    </>
  )
}

export default GuestbookPage
