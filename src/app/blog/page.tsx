import type { Metadata } from 'next'

import { getAllPosts } from '@/lib/mdx'

import FilteredPosts from '@/components/FilteredPosts'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Blog',
  description: '我的 blog。',
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
          我在 2020 年 12 月開始寫文章，主要是軟體和分享知識。我總共寫了{' '}
          {posts.length} 篇文章在我的 blog。你可以用標題搜尋文章在下面的搜尋框。
        </p>
      </div>
      <FilteredPosts posts={posts} />
    </>
  )
}

export default BlogPage
