import { Alert, AlertDescription, AlertTitle } from '@tszhong0411/ui'
import { Link } from '@tszhong0411/ui'
import { type MDXComponents } from 'mdx/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'

import { rehypePlugins } from '@/config/rehype-plugins'
import { remarkPlugins } from '@/config/remark-plugins'
import createHeading from '@/utils/create-heading'

import ImageZoom from '../image-zoom'
import Checkbox from './checkbox'
import Image from './image'
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
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { children, ...rest } = props

    return (
      <Link variant='article' {...rest}>
        {children}
      </Link>
    )
  },
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
    <div className='prose prose-invert w-full max-w-none'>
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            // @ts-expect-error I don't know what's wrong
            rehypePlugins,
            remarkPlugins
          }
        }}
      />
    </div>
  )
}

export default Mdx
