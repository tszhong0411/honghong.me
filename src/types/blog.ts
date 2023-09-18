import { type BlogPost } from 'contentlayer/generated'

/**
 * A subset of the BlogPost type that includes only the core properties.
 * @see {@link BlogPost}
 */
export type BlogPostCore = Pick<
  BlogPost,
  '_id' | 'slug' | 'title' | 'summary' | 'date'
>
