import { pick } from 'contentlayer/client'
import { allBlogPosts } from 'contentlayer/generated'

/**
 * The props for the {@link getAllPosts} function.
 */
type GetAllPostsProps = {
  /**
   * The maximum number of posts to return.
   */
  limit?: number
  /**
   * Whether to sort the posts by date.
   */
  sorted?: boolean
}

/**
 * Get all blog posts.
 * @param config - The configuration of this function.
 * @returns The posts with the specified configuration.
 */
const getAllPosts = (config: GetAllPostsProps = {}) => {
  const { limit = allBlogPosts.length, sorted = true } = config

  const posts = allBlogPosts
    .slice(0, limit)
    .map((post) => pick(post, ['_id', 'slug', 'title', 'summary', 'date']))

  if (sorted) {
    return posts.sort(
      (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
    )
  }

  return posts
}

export default getAllPosts
