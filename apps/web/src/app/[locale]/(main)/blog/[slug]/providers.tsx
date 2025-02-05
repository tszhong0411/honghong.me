'use client'

import type { Post } from 'content-collections'

import { PostProvider } from '@/contexts/post'

type ProvidersProps = {
  children: React.ReactNode
  post: Post
}

const Providers = (props: ProvidersProps) => {
  const { children, post } = props

  return <PostProvider value={post}>{children}</PostProvider>
}

export default Providers
