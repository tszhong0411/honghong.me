'use client'

import { Alert, AlertDescription, AlertTitle, Kbd } from '@tszhong0411/ui'
import { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Image from './image'
import ItemGrid from './item-grid'
import Link from './link'
import Pre from './pre'
import Tree from './tree'
import Video from './video'

type MdxProps = {
  code: string
}

const components: MDXComponents = {
  a: Link,
  Image: (props: React.ComponentPropsWithoutRef<typeof Image>) => {
    const { alt, ...rest } = props

    return <Image className='my-6 rounded-lg' alt={alt} {...rest} />
  },
  pre: Pre,

  // Custom components
  Alert: (props: React.ComponentPropsWithoutRef<typeof Alert>) => (
    <Alert {...props} />
  ),
  AlertTitle: (props: React.ComponentPropsWithoutRef<typeof AlertTitle>) => (
    <AlertTitle {...props} />
  ),
  AlertDescription: (
    props: React.ComponentPropsWithoutRef<typeof AlertDescription>,
  ) => <AlertDescription {...props} />,
  ItemGrid,
  Tree,
  Kbd,
  Video,
}

const Mdx = (props: MdxProps) => {
  const { code } = props
  const Component = useMDXComponent(code)

  return (
    <div className='prose prose-invert w-full max-w-none'>
      <Component components={{ ...components }} />
    </div>
  )
}

export default Mdx
