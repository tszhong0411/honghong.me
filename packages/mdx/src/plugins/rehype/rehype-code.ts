/**
 * Adapted from: https://github.com/fuma-nama/fumadocs/blob/691f12aa93df25bd10fa5bd6f91f70766c1fef12/packages/core/src/mdx-plugins/rehype-code.ts
 */
import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import { transformerMetaHighlight } from '@shikijs/transformers'
import type { Root } from 'hast'
import type { Plugin } from 'unified'

const titleRegex = /title="([^"]*)"/

export const DEFAULT_SHIKI_THEMES = {
  light: 'github-light',
  dark: 'github-dark'
}

export const rehypeCode: [
  Plugin<[RehypeShikiOptions], Root>,
  RehypeShikiOptions
] = [
  rehypeShiki,
  {
    transformers: [
      {
        /**
         * - Remove trailing newline
         * - Remove title from meta
         */
        preprocess: (code, { meta }) => {
          if (meta) {
            meta.__raw = meta.__raw?.replace(titleRegex, '')
          }

          return code.replace(/\n$/, '')
        },
        root(hast) {
          const pre = hast.children[0]
          if (pre?.type !== 'element') return

          hast.children = [
            {
              ...pre,
              properties: {
                ...pre.properties,
                'data-lang': this.options.lang
              }
            }
          ]
        }
      },
      transformerMetaHighlight()
    ],
    parseMetaString: (meta) => {
      const titleMatch = meta.match(titleRegex)
      const title = titleMatch?.[1] ?? null

      return { title }
    },
    themes: DEFAULT_SHIKI_THEMES,
    defaultColor: false
  }
]
