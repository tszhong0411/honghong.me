import { type DocumentType, type MakeSourceOptions } from '@tszhong0411/mdx'

const BlogPost = {
  name: 'BlogPost',
  filePathPattern: 'blog/*.mdx',
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
    }
  ]
} satisfies DocumentType

const Project = {
  name: 'Project',
  filePathPattern: 'projects/*.mdx',
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
    }
  ]
} satisfies DocumentType

const Page = {
  name: 'Page',
  filePathPattern: 'pages/*.mdx'
} satisfies DocumentType

export default {
  contentDirPath: 'src/content',
  defs: [BlogPost, Project, Page]
} satisfies MakeSourceOptions
