import { defineCollection, defineConfig } from '../../../types/config'

const Page = defineCollection({
  name: 'Page',
  filePathPattern: 'pages/*.mdx'
})

export default defineConfig({
  contentDirPath: 'content',
  collections: [Page]
})
