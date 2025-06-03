import { useMDXComponent } from '@content-collections/mdx/react'
import { Alert, AlertDescription, AlertTitle, CodeBlock, Link } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { InfoIcon } from 'lucide-react'

import ComponentPreview from './component-preview'
import EmbedComponentPreview from './embed-component-preview'
import Heading from './heading'
import TreeView from './tree-view'

type MdxProps = {
  code: string
} & React.ComponentProps<'div'>

const components = {
  h2: (props: React.ComponentProps<'h2'>) => <Heading as='h2' {...props} />,
  h3: (props: React.ComponentProps<'h3'>) => <Heading as='h3' {...props} />,
  h4: (props: React.ComponentProps<'h4'>) => <Heading as='h4' {...props} />,
  h5: (props: React.ComponentProps<'h5'>) => <Heading as='h5' {...props} />,
  h6: (props: React.ComponentProps<'h6'>) => <Heading as='h6' {...props} />,
  a: (props: React.ComponentProps<'a'>) => {
    const { href, ...rest } = props

    if (!href) throw new Error('Link must have an href')

    // eslint-disable-next-line jsx-a11y/anchor-has-content -- it's a custom component
    return <Link href={href} {...rest} />
  },

  // Custom components
  Alert: (props: React.ComponentProps<typeof Alert>) => {
    const { className, children, ...rest } = props

    return (
      <Alert className={cn('my-4', className)} {...rest}>
        <InfoIcon className='size-4' />
        {children}
      </Alert>
    )
  },
  AlertTitle: (props: React.ComponentProps<typeof AlertTitle>) => <AlertTitle {...props} />,
  AlertDescription: (props: React.ComponentProps<typeof AlertDescription>) => (
    <AlertDescription className='[&_p]:m-0' {...props} />
  ),
  ComponentPreview,
  EmbedComponentPreview,
  TreeView,

  pre: CodeBlock
}

const Mdx = (props: MdxProps) => {
  const { code, className, ...rest } = props
  const MDXContent = useMDXComponent(code)

  return (
    <div className={cn('prose w-full', className)} {...rest}>
      <MDXContent components={components} />
    </div>
  )
}

export default Mdx
