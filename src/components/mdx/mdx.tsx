'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Kbd,
  ScrollArea,
  Scrollbar,
} from '@tszhong0411/ui'
import { MDXComponents } from 'mdx/types'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Image from './image'
import ItemGrid from './item-grid'
import Link from './link'
import LinkCard from './link-card'
import Pre from './pre'
import Tree from './tree'
import Video from './video'
import ImageZoom from '../image-zoom'

type MdxProps = {
  code: string
}

const components: MDXComponents = {
  a: Link,
  Image: (props: React.ComponentPropsWithoutRef<typeof Image>) => {
    const { alt, ...rest } = props

    return (
      <>
        <ImageZoom>
          <Image className='my-6 rounded-lg' alt={alt} {...rest} />
        </ImageZoom>
        <figcaption className='mt-2 text-center text-sm text-accent-6'>
          {alt}
        </figcaption>
      </>
    )
  },
  pre: Pre,
  table: (props: React.ComponentPropsWithoutRef<'table'>) => {
    const { children, ...rest } = props

    return (
      <div className='not-prose overflow-hidden rounded-lg border border-accent-2'>
        <ScrollArea>
          <table
            className='w-full border-collapse border-spacing-0 text-left [&>tbody>tr:not(:last-child)>td]:border-b [&>tbody>tr:not(:last-child)>td]:border-accent-2'
            {...rest}
          >
            {children}
          </table>
          <Scrollbar orientation='horizontal' />
        </ScrollArea>
      </div>
    )
  },
  th: (props: React.ComponentPropsWithoutRef<'th'>) => {
    const { children, ...rest } = props

    return (
      <th className='border-b border-accent-2 bg-zinc-900 p-3' {...rest}>
        {children}
      </th>
    )
  },
  td: (props: React.ComponentPropsWithoutRef<'td'>) => {
    const { children, ...rest } = props

    return (
      <td className='bg-zinc-950 p-3' {...rest}>
        {children}
      </td>
    )
  },

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
  LinkCard,
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
