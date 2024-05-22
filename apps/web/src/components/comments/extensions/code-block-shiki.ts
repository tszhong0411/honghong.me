/**
 * Adapted from: https://github.com/litingyes/note-editor/blob/38d419149ef666cfcb4e103a1f4f9fa50f5f728e/packages/tiptap-extension-code-block-shiki/src/codeBlockShiki.ts
 */
import { findChildren } from '@tiptap/core'
import { CodeBlock, type CodeBlockOptions } from '@tiptap/extension-code-block'
import type { Node as ProsemirrorNode } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import {
  Decoration,
  type DecorationAttrs,
  DecorationSet
} from '@tiptap/pm/view'
import type { Element } from 'hast'
import {
  bundledLanguages,
  bundledLanguagesInfo,
  getHighlighter,
  type Highlighter
} from 'shiki'

export type CodeBlockShikiOptions = {
  themes: {
    light: string
    dark: string
  }
  defaultLanguage: string | null | undefined
} & CodeBlockOptions

export type CodeBlockShikiStorage = {
  highlighter: Highlighter | null
}

type NodeElement = {
  children: Array<{
    type: string
    value: string
  }>
} & Omit<Element, 'children'>

const formatLanguage = (language: string | null | undefined) => {
  if (!language) return null

  return bundledLanguagesInfo.find((item) =>
    [item.id, item.name, ...(item.aliases ?? [])].includes(language)
  )?.id
}

const getDecorations = ({
  doc,
  name,
  highlighter,
  themes
}: {
  doc: ProsemirrorNode
  name: string
  highlighter: CodeBlockShikiStorage['highlighter']
  themes: CodeBlockShikiOptions['themes']
}) => {
  let decorations: Decoration[] = []
  if (!highlighter) return DecorationSet.create(doc, decorations)

  for (const block of findChildren(doc, (node) => node.type.name === name)) {
    const preNode = highlighter.codeToHast(block.node.textContent, {
      themes,
      lang:
        formatLanguage(
          block.node.attrs.language as string | null | undefined
        ) ?? 'plaintext',
      defaultColor: false
    }).children[0] as Element

    decorations.push(
      Decoration.node(block.pos, block.pos + block.node.nodeSize, {
        class: `${preNode.properties.class as string}`
      })
    )

    let from = block.pos + 1

    const lines = (preNode.children[0] as Element).children as Element[]

    for (const line of lines) {
      if (line.children?.length) {
        let lineFrom = from

        for (const node of line.children) {
          const nodeLength = (node as NodeElement).children[0]!.value.length

          decorations.push(
            Decoration.inline(
              lineFrom,
              lineFrom + nodeLength,
              (node as NodeElement).properties as DecorationAttrs
            )
          )

          lineFrom += nodeLength
        }

        from = lineFrom
      } else if (line.type !== 'element') {
        from += (line as unknown as NodeElement['children'][0]).value.length
      }
    }
  }

  decorations = decorations.filter((item) => !!item)

  return DecorationSet.create(doc, decorations)
}

export const codeBlockShiki = CodeBlock.extend<
  CodeBlockShikiOptions,
  CodeBlockShikiStorage
>({
  addOptions() {
    return {
      ...this.parent?.(),
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      }
    }
  },
  addStorage() {
    return {
      highlighter: null
    }
  },
  async onBeforeCreate() {
    this.storage.highlighter = await getHighlighter({
      themes: Object.values(this.options.themes),
      langs: Object.keys(bundledLanguages)
    })
  },
  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() ?? []),
      new Plugin({
        key: new PluginKey(this.name),
        state: {
          init: (_, { doc }) =>
            getDecorations({
              doc,
              name: this.name,
              highlighter: this.storage.highlighter,
              themes: this.options.themes
            }),
          apply: (transaction, decorationSet, oldState, newState) => {
            const oldNodeName = oldState.selection.$head.parent.type.name
            const newNodeName = newState.selection.$head.parent.type.name

            if (
              transaction.docChanged &&
              ([oldNodeName, newNodeName].includes(this.name) ||
                // @ts-expect-error attr
                transaction.steps.some((item) => item.attr === 'language'))
            ) {
              return getDecorations({
                doc: transaction.doc,
                name: this.name,
                highlighter: this.storage.highlighter,
                themes: this.options.themes
              })
            }

            // eslint-disable-next-line unicorn/no-array-callback-reference, unicorn/no-array-method-this-argument
            return decorationSet.map(transaction.mapping, transaction.doc)
          }
        },
        props: {
          decorations(state) {
            return this.getState(state)
          }
        }
      })
    ]
  }
  // addNodeView() {
  //   return () => {
  //     const dom = document.createElement('pre')
  //     const contentDOM = document.createElement('code')

  //     dom.append(contentDOM)

  //     return {
  //       dom,
  //       contentDOM
  //     }
  //   }
  // }
})
