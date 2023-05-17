import { rehypePrettyCode } from '@tszhong0411/utils'
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import { s } from 'hastscript'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const Techstack = defineNestedType(() => ({
  name: 'Techstack',
  fields: {
    label: {
      type: 'string',
      description: 'The label of the techstack',
      required: true,
    },
  },
}))

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the project',
      required: true,
    },
    description: {
      type: 'string',
      description: 'The description of the project',
      required: true,
    },
    homepage: {
      type: 'string',
      description: "The link to the project's homepage",
      required: false,
    },
    github: {
      type: 'string',
      description: "The url to the project's github page",
      required: true,
    },
    icon: {
      type: 'string',
      description: 'The name of the icon to use',
      required: true,
    },
    image: {
      type: 'string',
      description: 'Image for the project',
      required: true,
    },
    repo: {
      type: 'string',
      description: 'The name of the repo of the project',
      required: true,
    },
    techstack: {
      type: 'list',
      of: Techstack,
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the blog post',
      required: true,
    },
    date: {
      type: 'string',
      description: 'The date of the blog post',
      required: true,
    },
    modifiedTime: {
      type: 'string',
      description: 'The modified time of the blog post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'The summary of the blog post',
      required: true,
    },
    image: {
      type: 'string',
      description: 'Image for the blog post',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

const Pages = defineDocumentType(() => ({
  name: 'Pages',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'src/contents',
  documentTypes: [Project, BlogPost, Pages],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      ...rehypePrettyCode,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['absolute left-0 top-0 bottom-0 w-full group'],
          },
          content: [
            s(
              'svg',
              {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 16,
                height: 16,
                fill: 'currentColor',
                className:
                  'invisible absolute top-1/2 right-full h-4 w-4 -translate-y-1/2 text-accent-6 group-hover:visible mr-2',
                viewBox: '0 0 24 24',
              },
              s('path', {
                d: 'M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z',
              })
            ),
          ],
        },
      ],
    ],
  },
})
