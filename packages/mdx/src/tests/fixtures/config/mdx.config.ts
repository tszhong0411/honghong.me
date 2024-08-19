import type { DocumentType, MakeSourceOptions } from '@/types'

const Page = {
  name: 'Page',
  filePathPattern: 'pages/*.mdx'
} satisfies DocumentType

export default {
  contentDirPath: 'content',
  defs: [Page]
} satisfies MakeSourceOptions
