import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'
import { getCurrentUser } from '@/lib/auth'
import { flags } from '@/lib/constants'

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
      canonical: '/guestbook'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/guestbook',
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
  if (!flags.auth) return null

  const user = await getCurrentUser()

  return (
    <>
      <PageTitle
        title='Guestbook'
        description='You can tell me anything here!'
      />
      <div className='mx-auto max-w-lg'>
        <Pinned />
        {user ? <Form user={user} /> : <SignIn />}
        <Messages />
      </div>
    </>
  )
}

export default GuestbookPage
