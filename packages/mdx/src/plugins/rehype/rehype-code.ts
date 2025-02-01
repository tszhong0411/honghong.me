/**
 * fumadocs (MIT License)
 * Copyright (c) fuma-nama
 * Source: https://github.com/fuma-nama/fumadocs/blob/691f12aa93df25bd10fa5bd6f91f70766c1fef12/packages/core/src/mdx-plugins/rehype-code.ts
 *
 * Modified by: tszhong0411
 */
import type { Root } from 'hast'
import type { Plugin } from 'unified'

import rehypeShiki, { type RehypeShikiOptions } from '@shikijs/rehype'
import { transformerNotationHighlight } from '@shikijs/transformers'

const titleRegex = /title=["']([^"']*)["']/

export const DEFAULT_SHIKI_THEMES = {
  light: 'github-light-default',
  dark: 'github-dark-default'
}

export const rehypeCode: [Plugin<[RehypeShikiOptions], Root>, RehypeShikiOptions] = [
  rehypeShiki,
  {
    transformers: [
      {
        /**
         * - Remove trailing newline
         * - Remove title from meta
         */
        preprocess(code, { meta }) {
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
      transformerNotationHighlight()
    ],
    parseMetaString: (meta) => {
      const titleMatch = titleRegex.exec(meta)
      const title = titleMatch?.[1] ?? null

      return { title }
    },
    themes: DEFAULT_SHIKI_THEMES,
    defaultColor: false
  }
]
