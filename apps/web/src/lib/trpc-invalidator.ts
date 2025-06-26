import type { TRPCUtils } from './trpc-query-helpers'
import type { QueryClient } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'

import { logger } from './logger'
import { createTRPCQueryKeys } from './trpc-query-helpers'

const createTRPCInvalidator = (queryClient: QueryClient, trpc: TRPCUtils) => {
  const queryKeys = createTRPCQueryKeys(trpc)

  const commentsInvalidator = {
    invalidateInfiniteComments: async (
      params: Parameters<typeof queryKeys.comments.infiniteComments>[0]
    ) => {
      logger.info('Invalidating infinite comments', { params })
      await queryClient.invalidateQueries({
        queryKey: queryKeys.comments.infiniteComments(params)
      })
    },

    invalidateCountsBySlug: async (slug: string) => {
      logger.info('[comments] Invalidating counts by slug', { slug })
      const keys = queryKeys.comments.allBySlug(slug)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: keys.count }),
        queryClient.invalidateQueries({ queryKey: keys.replyCount }),
        queryClient.invalidateQueries({ queryKey: keys.totalCount })
      ])
    },

    invalidateAfterAction: async (params: {
      slug: string
      infiniteCommentsParams?: Parameters<typeof queryKeys.comments.infiniteComments>[0]
    }) => {
      const { slug, infiniteCommentsParams } = params
      logger.info('[comments] Invalidating after action', { slug, infiniteCommentsParams })

      const promises = [
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.count(slug) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.replyCount(slug) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.totalCount(slug) })
      ]

      if (infiniteCommentsParams) {
        promises.push(
          queryClient.invalidateQueries({
            queryKey: queryKeys.comments.infiniteComments(infiniteCommentsParams)
          })
        )
      }

      await Promise.all(promises)
    },

    invalidateAfterReply: async (params: {
      slug: string
      parentCommentId: string
      mainCommentsParams: Parameters<typeof queryKeys.comments.infiniteComments>[0]
      replyHighlightedId?: string
    }) => {
      const { slug, parentCommentId, mainCommentsParams, replyHighlightedId } = params
      logger.info('[comments] Invalidating after reply', {
        slug,
        parentCommentId,
        mainCommentsParams,
        replyHighlightedId
      })

      const repliesParams = {
        slug,
        sort: 'oldest' as const,
        parentId: parentCommentId,
        type: 'replies' as const,
        highlightedCommentId: replyHighlightedId
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.comments.infiniteComments(mainCommentsParams)
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.comments.infiniteComments(repliesParams)
        }),
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.count(slug) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.replyCount(slug) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.comments.totalCount(slug) })
      ])
    }
  }

  return {
    comments: commentsInvalidator,
    likes: {
      invalidateBySlug: async (slug: string) => {
        logger.info('[likes] Invalidating by slug', { slug })
        await queryClient.invalidateQueries({
          queryKey: queryKeys.likes.get(slug)
        })
      }
    },
    views: {
      invalidateBySlug: async (slug: string) => {
        logger.info('[views] Invalidating by slug', { slug })
        await queryClient.invalidateQueries({
          queryKey: queryKeys.views.get(slug)
        })
      }
    },
    guestbook: {
      invalidateAll: async () => {
        logger.info('[guestbook] Invalidating all messages')
        await queryClient.invalidateQueries({
          queryKey: queryKeys.guestbook.infiniteMessages()
        })
      }
    },
    combinations: {
      afterPostComment: async (
        slug: string,
        infiniteCommentsParams: Parameters<typeof queryKeys.comments.infiniteComments>[0]
      ) => {
        logger.info('[combinations] Invalidating after posting comment', {
          slug,
          infiniteCommentsParams
        })
        await commentsInvalidator.invalidateAfterAction({ slug, infiniteCommentsParams })
      },

      afterDeleteComment: async (slug: string) => {
        logger.info('[combinations] Invalidating after deleting comment', { slug })
        await Promise.all([
          queryClient.invalidateQueries({
            predicate: (query) => {
              const queryKey = query.queryKey
              const matches =
                Array.isArray(queryKey) &&
                queryKey.includes('comments') &&
                queryKey.includes('getInfiniteComments') &&
                JSON.stringify(queryKey).includes(slug)
              if (matches) {
                logger.info('Matched query for invalidation', { queryKey })
              }
              return matches
            }
          }),
          commentsInvalidator.invalidateCountsBySlug(slug)
        ])
      },
      afterRateComment: async (
        infiniteCommentsParams: Parameters<typeof queryKeys.comments.infiniteComments>[0]
      ) => {
        logger.info('[combinations] Invalidating after rating comment', { infiniteCommentsParams })
        await commentsInvalidator.invalidateInfiniteComments(infiniteCommentsParams)
      }
    }
  }
}

export const useTRPCInvalidator = () => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  return createTRPCInvalidator(queryClient, trpc)
}
