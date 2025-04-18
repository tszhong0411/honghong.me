'use client'

import type { Post } from 'content-collections'

import { useTranslations } from '@tszhong0411/i18n/client'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import PostCards from './post-cards'

type FilteredPostsProps = {
  posts: Post[]
}

const FilteredPosts = (props: FilteredPostsProps) => {
  const { posts } = props
  const [searchValue, setSearchValue] = useState('')
  const t = useTranslations()

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
          placeholder={t('component.filtered-posts.placeholder')}
          aria-label={t('component.filtered-posts.placeholder')}
          className='w-full pl-12'
          id='search'
        />
        <Label htmlFor='search'>
          <SearchIcon className='absolute left-4 top-1/2 size-5 -translate-y-1/2' />
        </Label>
      </div>
      {filteredPosts.length === 0 ? (
        <div className='my-24 text-center text-xl'>
          {t('component.filtered-posts.no-posts-found')}
        </div>
      ) : null}
      <PostCards posts={filteredPosts} />
    </>
  )
}

export default FilteredPosts
