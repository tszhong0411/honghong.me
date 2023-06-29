import type { Metadata } from 'next'

import getAllPosts from '@/lib/mdx'

import Hero from '@/components/hero'
import Posts from '@/components/posts'
import Projects from '@/components/projects'

import { site } from '@/config/site'

export const metadata: Metadata = {
  alternates: {
    canonical: site.url,
  },
}

const HomePage = () => {
  const posts = getAllPosts({
    limit: 4,
  })

  return (
    <>
      <Hero />
      <Projects />
      <Posts posts={posts} />
    </>
  )
}

export default HomePage
