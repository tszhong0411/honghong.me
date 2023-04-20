import type { Metadata } from 'next'

import getAllPosts from '@/lib/mdx'

import BlogPosts from '@/components/Home/BlogPosts'
import Hero from '@/components/Home/Hero'
import Projects from '@/components/Home/Projects'

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
