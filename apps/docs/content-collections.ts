import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { rehypePlugins, remarkPlugins } from '@tszhong0411/mdx-plugins'
import { z } from 'zod'

const docs = defineCollection({
  name: 'Doc',
  directory: 'src/content',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    link: z
      .object({
        doc: z.string().optional(),
        api: z.string().optional()
      })
      .optional()
  }),
  transform: async (document, context) => {
    const code = await compileMDX(context, document, {
      remarkPlugins,
      rehypePlugins
    })
    const path = document._meta.path

    return {
      ...document,
      code,
      slug: path === 'index' ? '' : path
    }
  }
})

export default defineConfig({
  collections: [docs]
})
