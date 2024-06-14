import { type DocumentType, type MakeSourceOptions } from '@tszhong0411/mdx'

const Page = {
  name: 'Page',
  filePathPattern: 'pages/*.mdx'
} satisfies DocumentType

export default {
  contentDirPath: 'content',
  defs: [Page]
} satisfies MakeSourceOptions
