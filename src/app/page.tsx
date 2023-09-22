import type { Metadata } from 'next'

import Hero from '@/components/hero'
import Posts from '@/components/posts'
import Projects from '@/components/projects'
import site from '@/config/site'
import getAllPosts from '@/lib/mdx'

export const metadata: Metadata = {
  alternates: {
    canonical: site.url
  }
}

export const runtime = 'edge'

const HomePage = () => {
  const posts = getAllPosts({
    limit: 4
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
