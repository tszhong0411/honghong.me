import type { Metadata } from 'next'

import { getAllPosts } from '@/lib/mdx'

import FilteredPosts from '@/components/FilteredPosts'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a full-stack web development student from Hong Kong, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.',
  alternates: {
    canonical: `${site.url}/blog`,
  },
}

const BlogPage = () => {
  const posts = getAllPosts()

  return (
    <>
      <div className='mb-8 space-y-8'>
        <h2 className='my-4 text-4xl font-bold'>Blog</h2>
        <p className='text-accent-5'>
          I started writing articles in December 2020, mainly about software and
          sharing knowledge. I have written a total of {posts.length} articles
          on my blog. You can search for articles by title in the search box
          below.
        </p>
      </div>
      <FilteredPosts posts={posts} />
    </>
  )
}

export default BlogPage
