import { type MDXComponents, MDXRemoteRSC } from '@tszhong0411/mdx'
import { BlurImage, File, Files, Folder, Link } from '@tszhong0411/ui'

import ImageZoom from '../image-zoom'
import Checkbox from './checkbox'
import Heading from './heading'
import ItemGrid from './item-grid'
import LinkCard from './link-card'
import Logo from './logo'
import Pre from './pre'
import Table from './table'
import Video from './video'

type MdxProps = {
  content: string
}

const components: MDXComponents = {
  h2: (props: React.ComponentPropsWithoutRef<'h2'>) => <Heading as='h2' {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<'h3'>) => <Heading as='h3' {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<'h4'>) => <Heading as='h4' {...props} />,
  h5: (props: React.ComponentPropsWithoutRef<'h5'>) => <Heading as='h5' {...props} />,
  h6: (props: React.ComponentPropsWithoutRef<'h6'>) => <Heading as='h6' {...props} />,
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
  Table,
  ItemGrid,
  Video,
  LinkCard,
  Logo,
  Files,
  File,
  Folder
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
