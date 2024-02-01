import { serialize } from 'next-mdx-remote/serialize'

import { rehypePlugins } from '@/config/rehype-plugins'
import { remarkPlugins } from '@/config/remark-plugins'

export const getMarkdownPreview = async (content: string) => {
  const result = await serialize(content, {
    mdxOptions: {
      // @ts-expect-error I don't know what's wrong
      rehypePlugins,
      remarkPlugins
    }
  })
  return {
    result
  }
}
