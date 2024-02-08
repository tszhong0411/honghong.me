import Mdx from '@/components/mdx'
import getHeadings from '@/utils/get-headings'

import LikeButton from './like-button'
import ProgressBar from './progress-bar'
import TableOfContents from './table-of-contents'

type ContentProps = {
  content: string
  slug: string
}

const Content = (props: ContentProps) => {
  const { content, slug } = props
  const headings = getHeadings(content)

  return (
    <>
      <div className='mt-8 flex flex-col justify-between lg:flex-row'>
        <article className='w-full lg:w-[670px]'>
          <Mdx content={content} />
        </article>
        <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
          <div className='sticky top-24 will-change-[transform,opacity]'>
            {headings && headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}
            <LikeButton slug={slug} />
          </div>
        </aside>
      </div>
      <ProgressBar />
    </>
  )
}

export default Content
