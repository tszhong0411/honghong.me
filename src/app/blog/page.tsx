'use client'

import { IconSearch } from '@tabler/icons-react'
import React from 'react'

import { getAllPosts } from '@/lib/mdx'

import PostCard from '@/components/PostCard'

const BlogPage = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const posts = getAllPosts()

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <div className='mb-8 space-y-8'>
        <h2 className='my-4 text-4xl font-bold'>Blog</h2>
        <p className='text-accent-5'>
          我在 2020 年 12 月開始寫文章，主要是軟件和分享知識。我總共寫了{' '}
          {posts.length} 篇文章在我的 blog。你可以用標題搜尋文章在下面的搜尋框。
        </p>
        <div className='relative'>
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='搜尋文章'
            aria-label='搜尋文章'
            className='w-full rounded-md border border-accent-2 bg-hong-bg py-2 px-3 pl-12 transition-colors duration-200 ease-linear focus:border-accent-5 focus:outline-none'
            id='search'
          />
          <label htmlFor='search'>
            <IconSearch
              className='absolute top-1/2 left-4 -translate-y-1/2'
              size={20}
            />
          </label>
        </div>
      </div>
      {!filteredPosts.length && (
        <div className='text-center text-xl'>沒有找到文章</div>
      )}
      <div className='grid gap-4 sm:grid-cols-2'>
        {filteredPosts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </>
  )
}

export default BlogPage
