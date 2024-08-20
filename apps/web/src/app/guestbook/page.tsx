import { flags } from '@tszhong0411/env'
import type { Metadata, ResolvingMetadata } from 'next'
import type { WebPage, WithContext } from 'schema-dts'

import PageTitle from '@/components/page-title'
import { getCurrentUser } from '@/lib/auth'
import { SITE_TITLE, SITE_URL } from '@/lib/constants'

import MessageBox from './message-box'
import Messages from './messages'
import Pinned from './pinned'
import SignIn from './sign-in'

const title = 'Guestbook'
const description = 'Sign my guestbook and share your idea. You can tell me anything here!'

type PageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

const jsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: `${SITE_URL}/guestbook`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: SITE_URL
  }
}

export const generateMetadata = async (
  _: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}

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

const Page = async () => {
  if (!flags.auth) return null

  const user = await getCurrentUser()

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <div className='mx-auto max-w-lg'>
        <Pinned />
        {user ? <MessageBox user={user} /> : <SignIn />}
        <Messages />
      </div>
    </>
  )
}

export default Page
