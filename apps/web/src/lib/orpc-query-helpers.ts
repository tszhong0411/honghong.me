import { orpc } from '@/orpc/client'

export const createORPCQueryKeys = () => ({
  comments: {
    infiniteComments: (params: {
      slug: string
      sort?: 'newest' | 'oldest'
      parentId?: string
      type?: 'comments' | 'replies'
      highlightedCommentId?: string
    }) =>
      orpc.comments.getInfiniteComments.infiniteKey({
        input: () => params,
        initialPageParam: undefined
      }),

    count: (slug: string) => orpc.comments.getCommentCount.queryKey({ input: { slug } }),

    replyCount: (slug: string) => orpc.comments.getReplyCount.queryKey({ input: { slug } }),

    totalCount: (slug: string) => orpc.comments.getTotalCommentCount.queryKey({ input: { slug } }),

    allBySlug: (slug: string) => ({
      count: orpc.comments.getCommentCount.queryKey({ input: { slug } }),
      replyCount: orpc.comments.getReplyCount.queryKey({ input: { slug } }),
      totalCount: orpc.comments.getTotalCommentCount.queryKey({ input: { slug } })
    })
  },

  likes: {
    get: (slug: string) => orpc.likes.getCount.queryKey({ input: { slug } })
  },

  views: {
    get: (slug: string) => orpc.views.getCount.queryKey({ input: { slug } })
  },

  guestbook: {
    infiniteMessages: (params: { cursor?: Date; limit?: number } = {}) =>
      orpc.guestbook.getInfiniteMessages.infiniteKey({
        input: () => params,
        initialPageParam: undefined
      })
  }
})
