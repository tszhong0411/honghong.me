import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import MDXComponents from '@/components/MDXComponents'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'A student who loves web development.',
  alternates: {
    canonical: `${site.url}/about`,
  },
}

const getPage = () => {
  const page = allPages.find((page) => page.slug === 'about')

  if (!page) {
    return notFound()
  }

  return page
}

const AboutPage = () => {
  const page = getPage()
  const MDXComponent = useMDXComponent(page.body.code)

  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>About</h2>
      <p className='mb-8 text-accent-5'>👋 Hi there! I am 小康.</p>
      <div className='prose prose-zinc w-full max-w-none dark:prose-invert'>
        <MDXComponent
          components={{
            ...MDXComponents,
          }}
        />
      </div>
    </>
  )
}

export default AboutPage
