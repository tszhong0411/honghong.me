import { type MDXComponents, MDXRemote } from '@tszhong0411/mdx'
import * as uiComponents from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'

import ComponentPreview from './component-preview'
import EmbedComponentPreview from './embed-component-preview'

type MdxProps = {
  content: string
} & React.ComponentProps<'div'>

const components: MDXComponents = {
  ...uiComponents,
  ComponentPreview,
  EmbedComponentPreview,

  pre: uiComponents.CodeBlock
}

const Mdx = (props: MdxProps) => {
  const { content, className, ...rest } = props

  return (
    <div className={cn('prose w-full', className)} {...rest}>
      <MDXRemote source={content} components={components} />
    </div>
  )
}

export default Mdx
