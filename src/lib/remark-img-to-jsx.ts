import fs from 'fs'
import sizeOf from 'image-size'
import { Literal, Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'

type ImageNode = {
  url: string
  alt: string
  name: string
  attributes: (Literal & { name: string })[]
} & Parent

const remarkImgToJsx = () => {
  return (tree: Node) => {
    visit(
      tree,
      (node: Parent): node is Parent =>
        node.type === 'paragraph' &&
        node.children.some((n) => n.type === 'image'),
      (node: Parent) => {
        const imageNode = node.children.find(
          (n) => n.type === 'image'
        ) as ImageNode

        // only local files
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

          imageNode.type = 'mdxJsxFlowElement'
          imageNode.name = 'Image'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            {
              type: 'mdxJsxAttribute',
              name: 'width',
              value: dimensions.width,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'height',
              value: dimensions.height,
            },
          ]

          // Change node type from p to div to avoid nesting error
          node.type = 'div'
          node.children = [imageNode]
        }
      }
    )
  }
}

export default remarkImgToJsx
