'use client'

import { Input, Label } from '@tszhong0411/ui'
import { SearchIcon } from 'lucide-react'
import type { BlogPost } from 'mdx/generated'
import { useState } from 'react'

import PostCards from './post-cards'

type FilteredPostsProps = {
  posts: BlogPost[]
}

const FilteredPosts = (props: FilteredPostsProps) => {
  const { posts } = props
  const [searchValue, setSearchValue] = useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <div className='relative mb-8'>
        <Input
          type='text'
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
          placeholder='Search articles'
          aria-label='Search articles'
          className='w-full pl-12'
          id='search'
        />
        <Label htmlFor='search'>
          <SearchIcon className='absolute left-4 top-1/2 size-5 -translate-y-1/2' />
        </Label>
      </div>
      {filteredPosts.length === 0 ? (
        <div className='my-24 text-center text-xl'>No posts found</div>
      ) : null}
      <PostCards posts={filteredPosts} />
    </>
  )
}

export default FilteredPosts
