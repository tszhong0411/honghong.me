'use client'

import { IconSearch } from '@tabler/icons-react'
import React from 'react'

import { Input, Label } from '@/components/ui'
import { type BlogPostCore } from '@/types'

import PostCards from './post-cards'

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
        <Input
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder='Search articles'
          aria-label='Search articles'
          className='w-full pl-12'
          id='search'
        />
        <Label htmlFor='search'>
          <IconSearch
            className='absolute left-4 top-1/2 -translate-y-1/2'
            size={20}
          />
        </Label>
      </div>
      {filteredPosts.length === 0 && (
        <div className='my-24 text-center text-xl'>No posts found</div>
      )}
      <PostCards posts={filteredPosts} />
    </>
  )
}

export default FilteredPosts
