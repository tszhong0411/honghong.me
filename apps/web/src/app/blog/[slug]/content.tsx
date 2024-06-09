import { flags } from '@tszhong0411/env'
import { getTOC } from '@tszhong0411/mdx'

import Mdx from '@/components/mdx'

import LikeButton from './like-button'
import ProgressBar from './progress-bar'
import TableOfContents from './table-of-contents'

type ContentProps = {
  content: string
  slug: string
}

const Content = async (props: ContentProps) => {
  const { content, slug } = props
  const toc = await getTOC(content)

  return (
    <>
      <div className='mt-8 flex flex-col justify-between lg:flex-row'>
        <article className='w-full lg:w-[670px]'>
          <Mdx content={content} />
        </article>
        <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
          <div className='sticky top-24 will-change-[transform,opacity]'>
            {toc.length > 0 ? <TableOfContents toc={toc} /> : null}
            {flags.likeButton ? <LikeButton slug={slug} /> : null}
          </div>
        </aside>
      </div>
      <ProgressBar />
    </>
  )
}

export default Content
