import { BlogPost } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

import LikeButton from '@/components/LikeButton'
import MDXComponents from '@/components/MDXComponents'
import TableOfContents from '@/components/TableOfContents'

type ContentProps = {
  post: BlogPost
  slug: string
}

const Content = (props: ContentProps) => {
  const { post, slug } = props

  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <div className='mt-8 flex flex-col justify-between lg:flex-row'>
      <article className='w-full lg:w-[540px]'>
        <div className='prose prose-zinc w-full max-w-none dark:prose-invert'>
          <MDXComponent components={MDXComponents} />
        </div>
      </article>
      <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
        <div className='sticky top-24'>
          <TableOfContents />
          <LikeButton slug={slug} />
        </div>
      </aside>
    </div>
  )
}

export default Content
