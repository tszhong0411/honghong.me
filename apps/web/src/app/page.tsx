import { allBlogPosts, allProjects } from 'mdx/generated'
import type { Metadata } from 'next'
import type { WebSite, WithContext } from 'schema-dts'

import AboutMe from '@/components/home/about-me'
import GetInTouch from '@/components/home/get-in-touch'
import Hero from '@/components/home/hero'
import LatestArticles from '@/components/home/latest-articles'
import SelectedProjects from '@/components/home/selected-projects'
import {
  SITE_DESCRIPTION,
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL
  }
}

const jsonLd: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  author: {
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL,
    sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_X_URL, SITE_GITHUB_URL, SITE_YOUTUBE_URL]
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': SITE_URL
  },
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  keywords: SITE_KEYWORDS,
  dateCreated: '2020-12-05',
  dateModified: new Date().toISOString()
}

const Page = () => {
  const posts = allBlogPosts
  const latestPosts = posts
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 2)

  const projects = allProjects

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <SelectedProjects projects={projects} />
      <AboutMe />
      <LatestArticles posts={latestPosts} />
      <GetInTouch />
    </>
  )
}

export default Page
