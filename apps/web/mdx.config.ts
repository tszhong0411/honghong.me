import { defineCollection, defineConfig } from '@tszhong0411/mdx'

const BlogPost = defineCollection({
  name: 'BlogPost',
  filePathPattern: '**/blog/*.mdx',
  fields: [
    {
      name: 'title',
      type: 'string',
      required: true
    },
    {
      name: 'date',
      type: 'string',
      required: true
    },
    {
      name: 'modifiedTime',
      type: 'string',
      required: true
    },
    {
      name: 'summary',
      type: 'string',
      required: true
    },
    {
      name: 'language',
      type: 'string',
      required: true
    }
  ],
  computedFields: [
    {
      name: 'slug',
      type: 'string',
      resolve: (doc) => {
        return doc.filePath.split('/').pop()?.replace('.mdx', '')
      }
    }
  ]
})

const Project = defineCollection({
  name: 'Project',
  filePathPattern: '**/projects/*.mdx',
  fields: [
    {
      name: 'name',
      type: 'string',
      required: true
    },
    {
      name: 'description',
      type: 'string',
      required: true
    },
    {
      name: 'homepage',
      type: 'string',
      required: false
    },
    {
      name: 'github',
      type: 'string',
      required: true
    },
    {
      name: 'techstack',
      type: 'list',
      fields: [
        {
          name: 'label',
          type: 'string',
          required: true
        }
      ],
      required: true
    },
    {
      name: 'selected',
      type: 'boolean'
    },
    {
      name: 'language',
      type: 'string',
      required: true
    }
  ],
  computedFields: [
    {
      name: 'slug',
      type: 'string',
      resolve: (doc) => {
        return doc.filePath.split('/').pop()?.replace('.mdx', '')
      }
    }
  ]
})

const Page = defineCollection({
  name: 'Page',
  filePathPattern: '**/pages/*.mdx',
  fields: [
    {
      name: 'language',
      type: 'string',
      required: true
    }
  ],
  computedFields: [
    {
      name: 'slug',
      type: 'string',
      resolve: (doc) => {
        return doc.filePath.split('/').pop()?.replace('.mdx', '')
      }
    }
  ]
})

export default defineConfig({
  contentDirPath: 'src/content',
  collections: [BlogPost, Project, Page]
})
