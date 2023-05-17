'use client'

import { Alert, AlertDescription, AlertTitle, Kbd } from '@tszhong0411/ui'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Image, { ImageProps } from './image'
import ItemGrid from './item-grid'
import Link from './link'
import Pre from './pre'
import Tree from './tree'

type MdxProps = {
  code: string
}

const components = {
  a: Link,
  Image: (props: ImageProps) => {
    const { alt, ...rest } = props

    return <Image rounded='rounded-lg' className='my-6' alt={alt} {...rest} />
  },
  pre: Pre,

  // Custom components
  Alert,
  AlertTitle,
  AlertDescription,
  ItemGrid,
  Tree,
  Kbd,
}

const Mdx = (props: MdxProps) => {
  const { code } = props
  const Component = useMDXComponent(code)

  return (
    <div className='prose w-full max-w-none dark:prose-invert'>
      {/* @ts-expect-error TODO: Fix it later https://github.com/contentlayerdev/contentlayer/issues/456 */}
      <Component components={{ ...components }} />
    </div>
  )
}

export default Mdx
