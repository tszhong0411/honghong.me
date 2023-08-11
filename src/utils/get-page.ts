import { allPages } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

const getPage = (slug: string) => {
  const page = allPages.find((page) => page.slug === slug)

  if (!page) {
    return notFound()
  }

  return page
}

export default getPage
