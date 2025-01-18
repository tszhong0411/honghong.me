import { defineCollection, defineConfig } from '@tszhong0411/mdx'

const Doc = defineCollection({
  name: 'Doc',
  filePathPattern: '**/*.mdx',
  fields: [
    {
      name: 'title',
      type: 'string',
      required: true
    },
    {
      name: 'description',
      type: 'string',
      required: true
    }
  ],
  computedFields: [
    {
      name: 'slugAsParams',
      type: 'string',
      resolve: (doc) => {
        return doc.filePath.replace('.mdx', '')
      }
    }
  ]
})

export default defineConfig({
  contentDirPath: 'src/app',
  collections: [Doc]
})
