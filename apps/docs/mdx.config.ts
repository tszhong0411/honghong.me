import type { DocumentType, MakeSourceOptions } from '@tszhong0411/mdx'

const Doc = {
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
} satisfies DocumentType

export default {
  contentDirPath: 'src/app',
  defs: [Doc]
} satisfies MakeSourceOptions
