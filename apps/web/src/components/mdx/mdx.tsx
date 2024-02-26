import { type MDXComponents, MDXRemoteRSC } from '@tszhong0411/mdx'
import {
  Alert,
  AlertDescription,
  AlertTitle,
  BlurImage,
  Link
} from '@tszhong0411/ui'
import * as React from 'react'

import ImageZoom from '../image-zoom'
import Checkbox from './checkbox'
import Heading from './heading'
import ItemGrid from './item-grid'
import LinkCard from './link-card'
import Logo from './logo'
import Pre from './pre'
import Table from './table'
import Tree from './tree'
import Video from './video'

type MdxProps = {
  content: string
}

const components: MDXComponents = {
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => (
    <Heading as='h2' {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => (
    <Heading as='h3' {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => (
    <Heading as='h4' {...props} />
  ),
  h5: (props: React.ComponentPropsWithoutRef<'h5'>) => (
    <Heading as='h5' {...props} />
  ),
  h6: (props: React.ComponentPropsWithoutRef<'h6'>) => (
    <Heading as='h6' {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { children, ...rest } = props

    return (
      <Link variant='article' {...rest}>
        {children}
      </Link>
    )
  },
  Image: (props: React.ComponentPropsWithoutRef<typeof BlurImage>) => {
    const { alt, ...rest } = props

    return (
      <>
        <ImageZoom>
          <BlurImage className='rounded-lg border' alt={alt} {...rest} />
        </ImageZoom>
        <figcaption className='mt-4 text-center'>{alt}</figcaption>
      </>
    )
  },
  pre: Pre,
  input: Checkbox,

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
  const { content } = props

  return (
    <div className='prose w-full'>
      <MDXRemoteRSC source={content} components={components} />
    </div>
  )
}

export default Mdx
