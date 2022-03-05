import { defineDocumentType, ComputedFields, makeSource } from 'contentlayer/source-files'

import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import remarkImgToJsx from './lib/remark-img-to-jsx'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    colorFeatured: { type: 'string' },
    fontFeatured: { type: 'string' },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields,
}))

export const OtherPage = defineDocumentType(() => ({
  name: 'OtherPage',
  filePathPattern: 'otherpage/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
  computedFields,
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, OtherPage],
  mdx: {
    remarkPlugins: [remarkGfm, remarkImgToJsx],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypePrism,
        {
          showLineNumbers: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})

export default contentLayerConfig
