import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from 'contentlayer/source-files'
import { type Element } from 'hast'
import rehypePrettyCode from 'rehype-pretty-code'

import getLanguageIconByExtension from './src/utils/get-language-icon-by-extension'

const Techstack = defineNestedType(() => ({
  name: 'Techstack',
  fields: {
    label: {
      type: 'string',
      description: 'The label of the techstack',
      required: true
    }
  }
}))

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: {
      type: 'string',
      description: 'The name of the project',
      required: true
    },
    description: {
      type: 'string',
      description: 'The description of the project',
      required: true
    },
    homepage: {
      type: 'string',
      description: "The link to the project's homepage",
      required: false
    },
    github: {
      type: 'string',
      description: "The url to the project's github page",
      required: true
    },
    image: {
      type: 'string',
      description: 'Image for the project',
      required: true
    },
    repo: {
      type: 'string',
      description: 'The name of the repo of the project',
      required: true
    },
    techstack: {
      type: 'list',
      of: Techstack,
      required: true
    },
    selected: {
      type: 'boolean',
      description: 'Whether the project is selected or not'
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
    }
  }
}))

const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the blog post',
      required: true
    },
    date: {
      type: 'string',
      description: 'The date of the blog post',
      required: true
    },
    modifiedTime: {
      type: 'string',
      description: 'The modified time of the blog post',
      required: true
    },
    summary: {
      type: 'string',
      description: 'The summary of the blog post',
      required: true
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
    }
  }
}))

const Pages = defineDocumentType(() => ({
  name: 'Pages',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
    }
  }
}))

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Project, BlogPost, Pages],
  mdx: {
    rehypePlugins: [
      [
        // @ts-expect-error IDK what's wrong
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
          onVisitTitle: (element: Element) => {
            element.children.unshift(
              getLanguageIconByExtension(
                element.properties['data-language'] as string
              )
            )
          }
        }
      ]
    ]
  }
})
