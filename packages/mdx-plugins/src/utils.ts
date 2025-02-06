import type { TOC } from './types'

import { remark } from 'remark'

import { remarkHeading } from './remark/remark-heading'

export const getTOC = async (content: string) => {
  const result = await remark().use(remarkHeading).process(content)

  if ('toc' in result.data) {
    return result.data.toc as TOC[]
  }

  return []
}
