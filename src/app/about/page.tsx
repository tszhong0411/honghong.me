import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import MDXComponents from '@/components/MDXComponents'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: '關於',
  description: '一名熱愛網頁開發的學生。',
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
      <h2 className='my-4 text-4xl font-bold'>關於</h2>
      <p className='mb-8 text-accent-5'>👋 你好! 我是小康。</p>
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
