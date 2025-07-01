import { orpc } from '@/orpc/client'

const comments = {
  list: (params: {
    slug: string
    sort?: 'newest' | 'oldest'
    parentId?: string
    type?: 'comments' | 'replies'
    highlightedCommentId?: string
  }) =>
    orpc.posts.comments.list.infiniteKey({
      input: () => params,
      initialPageParam: undefined
    }),

  count: (slug: string) => orpc.posts.comments.count.queryKey({ input: { slug } }),

  replyCount: (slug: string) => orpc.posts.replies.count.queryKey({ input: { slug } }),

  totalCount: (slug: string) =>
    orpc.posts.comments.count.queryKey({ input: { slug, withReplies: true } }),

  allBySlug: (slug: string) => ({
    count: comments.count(slug),
    replyCount: comments.replyCount(slug),
    totalCount: comments.totalCount(slug)
  })
}

const likes = {
  get: (slug: string) => orpc.posts.likes.get.queryKey({ input: { slug } })
}

const views = {
  get: (slug: string) => orpc.posts.views.get.queryKey({ input: { slug } })
}

const guestbook = {
  list: (params: { cursor?: Date; limit?: number } = {}) =>
    orpc.guestbook.list.infiniteKey({
      input: () => params,
      initialPageParam: undefined
    })
}

export const oRPCQueryKeys = {
  comments,
  likes,
  views,
  guestbook
}
