import type { Metadata } from 'next'
import React from 'react'

import AboutMe from '@/components/home/about-me'
import GetInTouch from '@/components/home/get-in-touch'
import Hero from '@/components/home/hero'
import LatestArticles from '@/components/home/latest-articles'
import Projects from '@/components/home/projects'
import site from '@/config/site'

export const metadata: Metadata = {
  alternates: {
    canonical: site.url
  }
}

export const runtime = 'edge'

const HomePage = () => {
  return (
    <>
      <Hero />
      <Projects />
      <AboutMe />
      <LatestArticles />
      <GetInTouch />
    </>
  )
}

export default HomePage
