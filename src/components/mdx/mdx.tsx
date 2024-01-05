'use client'

import { type MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui'
import createHeading from '@/utils/create-heading'

import ImageZoom from '../image-zoom'
import Image from './image'
import ItemGrid from './item-grid'
import Link from './link'
import LinkCard from './link-card'
import Logo from './logo'
import Pre from './pre'
import Table from './table'
import Tree from './tree'
import Video from './video'

type MdxProps = {
  code: string
}

const components: MDXComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: Link,
  Image: (props: React.ComponentPropsWithoutRef<typeof Image>) => {
    const { alt, ...rest } = props

    return (
      <>
        <ImageZoom>
          <Image className='rounded-lg border' alt={alt} {...rest} />
        </ImageZoom>
        <figcaption className='mt-4 text-center'>{alt}</figcaption>
      </>
    )
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
    props: React.ComponentPropsWithoutRef<typeof AlertDescription>
  ) => <AlertDescription {...props} />,
  Table,
  ItemGrid,
  Tree,
  Video,
  LinkCard,
  Logo
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
