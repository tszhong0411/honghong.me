import type { Metadata } from 'next'

import getAllPosts from '@/lib/mdx'

import BlogPosts from '@/components/blog-posts'
import Hero from '@/components/hero'
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
      <BlogPosts posts={posts} />
    </>
  )
}

export default HomePage
