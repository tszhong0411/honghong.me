import { allPages } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

/**
 * Get a page object by its slug.
 * @param slug - The slug of the page.
 * @returns A page object.
 */
const getPage = (slug: string) => {
  const page = allPages.find((p) => p.slug === slug)

  if (!page) {
    return notFound()
  }

  return page
}

export default getPage
