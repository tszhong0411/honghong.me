import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from 'contentlayer/source-files'
import { type Element, type Root } from 'hast'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

import cn from './src/utils/cn'
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
    icon: {
      type: 'string',
      description: 'The name of the icon to use',
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

const rehypeAddClassesToCodeBlocks = (className: string) => {
  return (tree: Root) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.properties?.['data-rehype-pretty-code-fragment'] === undefined)
        return
      if (parent?.children === undefined) return
      if (typeof index !== 'number') return

      Object.assign(node.properties, {
        className: cn(node.properties?.className as string, className)
      })
    })
  }
}

const rehypeAddLanguageIconToCodeBlocks = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.properties?.['data-rehype-pretty-code-title'] === undefined)
        return

      node.children.unshift(
        getLanguageIconByExtension(node.properties['data-language'] as string)
      )
    })
  }
}

const rehypeCodeBlocksDarkTheme = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node, _, parent) => {
      if (node.tagName !== 'pre' && node.tagName !== 'code') return
      if (
        node.tagName === 'code' &&
        parent !== null &&
        parent !== undefined &&
        parent.type === 'element' &&
        parent.tagName === 'pre'
      )
        return
      if (!node.properties) return

      const theme = node.properties['data-theme']

      if (theme === undefined) return

      Object.assign(node.properties, {
        className: cn(
          node.properties?.className,
          theme === 'light'
            ? 'dark:hidden'
            : ['hidden', node.tagName === 'pre' ? 'dark:block' : 'dark:inline']
        )
      })
    })
  }
}

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Project, BlogPost, Pages],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['absolute left-0 top-0 bottom-0 w-full group'],
            ariaLabel: 'Link to this section'
          },
          content: [
            {
              type: 'element',
              tagName: 'svg',
              properties: {
                xmlns: 'http://www.w3.org/2000/svg',
                width: 16,
                height: 16,
                fill: 'currentColor',
                className:
                  'invisible absolute top-1/2 right-full h-4 w-4 -translate-y-1/2 text-secondary-foreground group-hover:visible mr-2',
                viewBox: '0 0 24 24'
              },
              children: [
                {
                  type: 'element',
                  tagName: 'path',
                  properties: {
                    d: 'M9.199 13.599a5.99 5.99 0 0 0 3.949 2.345 5.987 5.987 0 0 0 5.105-1.702l2.995-2.994a5.992 5.992 0 0 0 1.695-4.285 5.976 5.976 0 0 0-1.831-4.211 5.99 5.99 0 0 0-6.431-1.242 6.003 6.003 0 0 0-1.905 1.24l-1.731 1.721a.999.999 0 1 0 1.41 1.418l1.709-1.699a3.985 3.985 0 0 1 2.761-1.123 3.975 3.975 0 0 1 2.799 1.122 3.997 3.997 0 0 1 .111 5.644l-3.005 3.006a3.982 3.982 0 0 1-3.395 1.126 3.987 3.987 0 0 1-2.632-1.563A1 1 0 0 0 9.201 13.6zm5.602-3.198a5.99 5.99 0 0 0-3.949-2.345 5.987 5.987 0 0 0-5.105 1.702l-2.995 2.994a5.992 5.992 0 0 0-1.695 4.285 5.976 5.976 0 0 0 1.831 4.211 5.99 5.99 0 0 0 6.431 1.242 6.003 6.003 0 0 0 1.905-1.24l1.723-1.723a.999.999 0 1 0-1.414-1.414L9.836 19.81a3.985 3.985 0 0 1-2.761 1.123 3.975 3.975 0 0 1-2.799-1.122 3.997 3.997 0 0 1-.111-5.644l3.005-3.006a3.982 3.982 0 0 1 3.395-1.126 3.987 3.987 0 0 1 2.632 1.563 1 1 0 0 0 1.602-1.198z'
                  }
                }
              ]
            }
          ]
        }
      ],
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'github-light',
            dark: 'github-dark'
          },
          keepBackground: false,
          onVisitTitle: (element: Element) => {
            const theme = element.properties?.['data-theme']

            Object.assign(element.properties, {
              className: cn(
                element.properties?.className,
                theme === 'light' ? 'dark:hidden' : ['hidden dark:flex']
              )
            })
          }
        }
      ],
      [rehypeAddClassesToCodeBlocks, 'relative'],
      rehypeAddLanguageIconToCodeBlocks,
      rehypeCodeBlocksDarkTheme
    ]
  }
})
