import type { Metadata } from 'next'
import * as React from 'react'

import AboutMe from '@/components/home/about-me'
import GetInTouch from '@/components/home/get-in-touch'
import Hero from '@/components/home/hero'
import LatestArticles from '@/components/home/latest-articles'
import Projects from '@/components/home/projects'
import { WEBAPP_URL } from '@/lib/constants'
import { type BlogMetadata, getAllPages, type ProjectMetadata } from '@/lib/mdx'

export const metadata: Metadata = {
  alternates: {
    canonical: WEBAPP_URL
  }
}

const HomePage = () => {
  const posts = getAllPages<BlogMetadata>('blog')
  const projects = getAllPages<ProjectMetadata>('projects')

  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <AboutMe />
      <LatestArticles posts={posts} />
      <GetInTouch />
    </>
  )
}

export default HomePage
