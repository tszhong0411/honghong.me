import remarkGfm from 'remark-gfm'
import { type PluggableList } from 'unified'

import { rehypeCode } from './rehype/rehype-code'
import { rehypeInlineCode } from './rehype/rehype-inline-code'
import { remarkCode } from './remark/remark-code'
import { remarkHeading } from './remark/remark-heading'

export const remarkPlugins: PluggableList = [
  remarkGfm,
  remarkHeading,
  remarkCode
]
export const rehypePlugins: PluggableList = [rehypeCode, rehypeInlineCode]
