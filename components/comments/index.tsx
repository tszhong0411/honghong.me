import dynamic from 'next/dynamic'
import type { Blog } from 'contentlayer/generated'

import { CoreContent } from '@/lib/utils/contentlayer'
import { giscusConfig } from './Giscus'
interface Props {
  frontMatter: CoreContent<Blog>
}

const GiscusComponent = dynamic(
  () => {
    return import('@/components/comments/Giscus')
  },
  { ssr: false }
)

const Comments = ({ frontMatter }: Props) => {
  let term
  switch (giscusConfig.mapping) {
    case 'pathname':
      term = frontMatter.slug
      break
    case 'url':
      term = window.location.href
      break
    case 'title':
      term = frontMatter.title
      break
  }
  return (
    <div id="comment">
      <GiscusComponent mapping={term} />
    </div>
  )
}

export default Comments
