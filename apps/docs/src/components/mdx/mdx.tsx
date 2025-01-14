import { getMDXComponent, type MDXComponents } from '@tszhong0411/mdx'
import * as uiComponents from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'

import ComponentPreview from './component-preview'
import EmbedComponentPreview from './embed-component-preview'

type MdxProps = {
  code: string
} & React.ComponentProps<'div'>

const components: MDXComponents = {
  ...uiComponents,
  Callout: (props) => <uiComponents.Callout className='[&_p]:m-0' {...props} />,
  ComponentPreview,
  EmbedComponentPreview,

  pre: uiComponents.CodeBlock
}

const Mdx = (props: MdxProps) => {
  const { code, className, ...rest } = props
  const MDXContent = getMDXComponent(code)

  return (
    <div className={cn('prose w-full', className)} {...rest}>
      <MDXContent components={components} />
    </div>
  )
}

export default Mdx
