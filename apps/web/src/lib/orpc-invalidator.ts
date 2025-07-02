import type { QueryClient } from '@tanstack/react-query'

import { useQueryClient } from '@tanstack/react-query'

import { logger } from './logger'
import { oRPCQueryKeys } from './orpc-query-keys'

const createORPCInvalidator = (queryClient: QueryClient) => {
  const commentsInvalidator = {
    invalidateInfiniteComments: async (
      params: Parameters<typeof oRPCQueryKeys.comments.list>[0]
    ) => {
      logger.info('Invalidating infinite comments', { params })
      await queryClient.invalidateQueries({
        queryKey: oRPCQueryKeys.comments.list(params)
      })
    },

    invalidateCountsBySlug: async (slug: string) => {
      logger.info('[comments] Invalidating counts by slug', { slug })
      const keys = oRPCQueryKeys.comments.allBySlug(slug)
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: keys.count }),
        queryClient.invalidateQueries({ queryKey: keys.replyCount }),
        queryClient.invalidateQueries({ queryKey: keys.totalCount })
      ])
    },

    invalidateAfterAction: async (params: {
      slug: string
      infiniteCommentsParams?: Parameters<typeof oRPCQueryKeys.comments.list>[0]
    }) => {
      const { slug, infiniteCommentsParams } = params
      logger.info('[comments] Invalidating after action', { slug, infiniteCommentsParams })

      const promises = [
        queryClient.invalidateQueries({ queryKey: oRPCQueryKeys.comments.count(slug) }),
        queryClient.invalidateQueries({ queryKey: oRPCQueryKeys.comments.replyCount(slug) }),
        queryClient.invalidateQueries({ queryKey: oRPCQueryKeys.comments.totalCount(slug) })
      ]

      if (infiniteCommentsParams) {
        promises.push(
          queryClient.invalidateQueries({
            queryKey: oRPCQueryKeys.comments.list(infiniteCommentsParams)
          })
        )
      }

      await Promise.all(promises)
    },

    invalidateAfterReply: async (params: {
      slug: string
      parentCommentId: string
      mainCommentsParams: Parameters<typeof oRPCQueryKeys.comments.list>[0]
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
          queryKey: oRPCQueryKeys.comments.list(mainCommentsParams)
        }),
        queryClient.invalidateQueries({
          queryKey: oRPCQueryKeys.comments.list(repliesParams)
        }),
        queryClient.invalidateQueries({ queryKey: oRPCQueryKeys.comments.count(slug) }),
        queryClient.invalidateQueries({ queryKey: oRPCQueryKeys.comments.replyCount(slug) }),
        queryClient.invalidateQueries({ queryKey: oRPCQueryKeys.comments.totalCount(slug) })
      ])
    }
  }

  return {
    comments: commentsInvalidator,
    likes: {
      invalidateBySlug: async (slug: string) => {
        logger.info('[likes] Invalidating by slug', { slug })
        await queryClient.invalidateQueries({
          queryKey: oRPCQueryKeys.likes.get(slug)
        })
      }
    },
    views: {
      invalidateBySlug: async (slug: string) => {
        logger.info('[views] Invalidating by slug', { slug })
        await queryClient.invalidateQueries({
          queryKey: oRPCQueryKeys.views.get(slug)
        })
      }
    },
    guestbook: {
      invalidateAll: async () => {
        logger.info('[guestbook] Invalidating all messages')
        await queryClient.invalidateQueries({
          queryKey: oRPCQueryKeys.guestbook.list()
        })
      }
    },
    combinations: {
      afterPostComment: async (
        slug: string,
        infiniteCommentsParams: Parameters<typeof oRPCQueryKeys.comments.list>[0]
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
      afterVoteComment: async (
        infiniteCommentsParams: Parameters<typeof oRPCQueryKeys.comments.list>[0]
      ) => {
        logger.info('[combinations] Invalidating after voting comment', { infiniteCommentsParams })
        await commentsInvalidator.invalidateInfiniteComments(infiniteCommentsParams)
      }
    }
  }
}

export const useORPCInvalidator = () => {
  const queryClient = useQueryClient()

  return createORPCInvalidator(queryClient)
}
