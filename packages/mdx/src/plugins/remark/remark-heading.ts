import Slugger from 'github-slugger'
import { type Plugin } from 'unified'
import { visit } from 'unist-util-visit'

import { type TOC } from '../../types'

const slugger = new Slugger()

export const remarkHeading: Plugin = () => {
  return (tree, file) => {
    const toc: TOC[] = []
    slugger.reset()

    visit(tree, 'heading', (node: any) => {
      node.data ||= {}
      node.data.hProperties ||= {}

      const text = node.children[0].value
      const id = slugger.slug(text)

      node.data.hProperties.id = id

      toc.push({
        title: text,
        url: id,
        depth: node.depth
      })

      return 'skip'
    })

    file.data.toc = toc
  }
}
