'use client'

import type { Post } from 'content-collections'

import { PostProvider } from '@/stores/post'

type ProvidersProps = {
  children: React.ReactNode
  post: Post
}

const Providers = (props: ProvidersProps) => {
  const { children, post } = props

  return <PostProvider post={post}>{children}</PostProvider>
}

export default Providers
