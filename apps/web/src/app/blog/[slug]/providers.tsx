'use client'

import type { BlogPost } from 'mdx/generated'

import { PostProvider } from '@/contexts/post'

type ProvidersProps = {
  children: React.ReactNode
  post: BlogPost
}

const Providers = (props: ProvidersProps) => {
  const { children, post } = props

  return <PostProvider value={post}>{children}</PostProvider>
}

export default Providers
