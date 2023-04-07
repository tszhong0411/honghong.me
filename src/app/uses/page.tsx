import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import MDXComponents from '@/components/MDXComponents'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Uses',
  description: '這是我目前用來玩遊戲、編程、製作影片以及每天使用的設備。',
  alternates: {
    canonical: `${site.url}/uses`,
  },
}

const getPage = () => {
  const page = allPages.find((page) => page.slug === 'uses')

  if (!page) {
    return notFound()
  }

  return page
}

const UsesPage = () => {
  const page = getPage()
  const MDXComponent = useMDXComponent(page.body.code)

  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Uses</h2>
      <p className='mb-8 text-accent-5'>
        這是我目前用來玩遊戲、編程、製作影片以及每天使用的設備。
      </p>
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

export default UsesPage
