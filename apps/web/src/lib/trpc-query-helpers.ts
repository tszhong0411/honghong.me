import type { useTRPC } from '@/trpc/client'

export type TRPCUtils = ReturnType<typeof useTRPC>

/**
 * 統一的查詢鍵建立器，基於 tRPC
 */
export const createTRPCQueryKeys = (trpc: TRPCUtils) => ({
  // 評論相關的查詢鍵
  comments: {
    // 無限滾動評論列表
    infiniteComments: (params: {
      slug: string
      sort?: 'newest' | 'oldest'
      parentId?: string
      type?: 'comments' | 'replies'
      highlightedCommentId?: string
    }) => trpc.comments.getInfiniteComments.infiniteQueryKey(params),

    // 評論數量
    count: (slug: string) => trpc.comments.getCommentCount.queryKey({ slug }),

    // 回覆數量
    replyCount: (slug: string) => trpc.comments.getReplyCount.queryKey({ slug }),

    // 總評論數量
    totalCount: (slug: string) => trpc.comments.getTotalCommentCount.queryKey({ slug }),

    // 特定評論的所有相關查詢鍵
    allBySlug: (slug: string) => ({
      count: trpc.comments.getCommentCount.queryKey({ slug }),
      replyCount: trpc.comments.getReplyCount.queryKey({ slug }),
      totalCount: trpc.comments.getTotalCommentCount.queryKey({ slug })
    })
  },

  // 點讚相關
  likes: {
    get: (slug: string) => trpc.likes.get.queryKey({ slug })
  },

  // 訪問量相關
  views: {
    get: (slug: string) => trpc.views.get.queryKey({ slug })
  },

  // 留言板相關
  guestbook: {
    infiniteMessages: (params: { cursor?: Date; limit?: number } = {}) =>
      trpc.guestbook.getInfiniteMessages.infiniteQueryKey(params)
  }
})
