import type { useTRPC } from '@/trpc/client'

export type TRPCUtils = ReturnType<typeof useTRPC>

export const createTRPCQueryKeys = (trpc: TRPCUtils) => ({
  comments: {
    infiniteComments: (params: {
      slug: string
      sort?: 'newest' | 'oldest'
      parentId?: string
      type?: 'comments' | 'replies'
      highlightedCommentId?: string
    }) => trpc.comments.getInfiniteComments.infiniteQueryKey(params),

    count: (slug: string) => trpc.comments.getCommentCount.queryKey({ slug }),

    replyCount: (slug: string) => trpc.comments.getReplyCount.queryKey({ slug }),

    totalCount: (slug: string) => trpc.comments.getTotalCommentCount.queryKey({ slug }),

    allBySlug: (slug: string) => ({
      count: trpc.comments.getCommentCount.queryKey({ slug }),
      replyCount: trpc.comments.getReplyCount.queryKey({ slug }),
      totalCount: trpc.comments.getTotalCommentCount.queryKey({ slug })
    })
  },

  likes: {
    get: (slug: string) => trpc.likes.get.queryKey({ slug })
  },

  views: {
    get: (slug: string) => trpc.views.get.queryKey({ slug })
  },

  guestbook: {
    infiniteMessages: (params: { cursor?: Date; limit?: number } = {}) =>
      trpc.guestbook.getInfiniteMessages.infiniteQueryKey(params)
  }
})
