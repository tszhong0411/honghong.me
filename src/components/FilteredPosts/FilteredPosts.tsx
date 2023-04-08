'use client'

import { IconSearch } from '@tabler/icons-react'
import React from 'react'

import PostCard from '../PostCard'

import { BlogPostCore } from '@/types'

type FilteredPostsProps = {
  posts: BlogPostCore[]
}

const FilteredPosts = (props: FilteredPostsProps) => {
  const { posts } = props
  const [searchValue, setSearchValue] = React.useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <div className='relative mb-8'>
        <input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search articles'
          aria-label='Search articles'
          className='w-full rounded-md border border-accent-2 bg-hong-bg px-3 py-2 pl-12 transition-colors duration-200 ease-linear focus:border-accent-5 focus:outline-none'
          id='search'
        />
        <label htmlFor='search'>
          <IconSearch
            className='absolute left-4 top-1/2 -translate-y-1/2'
            size={20}
          />
        </label>
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

export default FilteredPosts
