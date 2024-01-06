import { pick } from 'contentlayer/client'
import { allBlogPosts } from 'contentlayer/generated'

type Options = {
  limit?: number
}

const getAllPosts = (options: Options = {}) => {
  const { limit = allBlogPosts.length } = options

  return allBlogPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, limit)
    .map((post) => pick(post, ['_id', 'slug', 'title', 'summary', 'date']))
}

export default getAllPosts
