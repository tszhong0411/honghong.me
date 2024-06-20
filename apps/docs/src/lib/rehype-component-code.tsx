import type { Root } from 'hast'
import fs from 'node:fs'
import path from 'node:path'
import { getHighlighter, type Highlighter } from 'shiki'
import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

/**
 * Get the source code of the component and append it to the MDX node
 * if the node is a `ComponentPreview` element.
 */
export const rehypeComponentCode: Plugin<unknown[], Root> = () => {
  let promise: Promise<Highlighter>

  return async (tree) => {
    promise = getHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: ['tsx']
    })

    const highlighter = await promise

    visit(tree, (node) => {
      if (node.type !== 'mdxJsxFlowElement') return
      if (node.name !== 'ComponentPreview') return

      const nameAttribute = node.attributes
        .filter((attr) => attr.type === 'mdxJsxAttribute')
        .find((attr) => attr.name === 'name')

      if (typeof nameAttribute?.value !== 'string') return

      const { value } = nameAttribute

      try {
        const componentPath = path.join(process.cwd(), `src/components/demos/${value}.tsx`)
        const code = fs.readFileSync(componentPath, 'utf8')

        const hast = highlighter.codeToHast(code, {
          themes: {
            light: 'github-light',
            dark: 'github-dark'
          },
          lang: 'tsx',
          defaultColor: false
        })

        if (hast.children[0]?.type !== 'element') return

        node.children.push(hast.children[0])
      } catch (error) {
        console.error(error)
      }
    })
  }
}
