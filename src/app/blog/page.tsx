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
          I started writing articles in December 2020, mainly for software
          sharing and skills sharing. In total, I have written {posts.length}{' '}
          articles on my blog. You can search by title in the search bar below.
        </p>
        <div className='relative'>
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search articles'
            aria-label='Search articles'
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
        <div className='text-center text-xl'>No posts found</div>
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
