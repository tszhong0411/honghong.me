import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import MDXComponents from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'

import { site } from '@/config/site'

const title = 'Design'
const description = 'This is the design of my website.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${site.url}/design`,
  },
  openGraph: {
    url: `${site.url}/design`,
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

const getPage = () => {
  const page = allPages.find((page) => page.slug === 'design')

  if (!page) {
    return notFound()
  }

  return page
}

const DesignPage = () => {
  const page = getPage()
  const MDXComponent = useMDXComponent(page.body.code)

  return (
    <>
      <PageTitle title='Design' description='This the design of my website.' />
      <div className='prose prose-invert w-full max-w-none'>
        <MDXComponent
          components={{
            ...MDXComponents,
          }}
        />
      </div>
    </>
  )
}

export default DesignPage
