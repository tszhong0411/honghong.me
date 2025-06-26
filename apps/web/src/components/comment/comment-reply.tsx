'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { Button, toast } from '@tszhong0411/ui'
import { useState } from 'react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCommentParams } from '@/hooks/use-comment-params'
import { useSession } from '@/lib/auth-client'
import { useTRPCInvalidator } from '@/lib/trpc-invalidator'
import { createTRPCQueryKeys } from '@/lib/trpc-query-helpers'
import { useTRPC } from '@/trpc/client'

import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'

const CommentReply = () => {
  const [content, setContent] = useState('')
  const { data: session } = useSession()
  const { comment, setIsReplying } = useCommentContext()
  const { slug, sort } = useCommentsContext()
  const [params] = useCommentParams()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const invalidator = useTRPCInvalidator()
  const t = useTranslations()

  // 使用統一的查詢鍵助手
  const queryKeys = createTRPCQueryKeys(trpc)
  const infiniteCommentsParams = {
    slug,
    sort,
    type: 'comments' as const,
    highlightedCommentId: params.comment ?? undefined
  }

  const commentsMutation = useMutation(
    trpc.comments.post.mutationOptions({
      onMutate: async () => {
        const queryKey = queryKeys.comments.infiniteComments(infiniteCommentsParams)

        await queryClient.cancelQueries({ queryKey })
        const previousData = queryClient.getQueryData(queryKey)

        // 樂觀更新
        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData) return { pages: [], pageParams: [] }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((c) =>
                c.id === comment.id ? { ...c, replies: c.replies + 1 } : c
              )
            }))
          }
        })

        return { previousData }
      },

      onSuccess: () => {
        setIsReplying(false)
        toast.success(t('blog.comments.reply-posted'))
      },

      onError: (error, _, ctx) => {
        if (ctx?.previousData) {
          queryClient.setQueryData(
            queryKeys.comments.infiniteComments(infiniteCommentsParams),
            ctx.previousData
          )
        }
        toast.error(error.message)
      },

      onSettled: async () => {
        // 使用專門的回覆失效邏輯，確保主評論列表和回覆列表都被失效
        await invalidator.comments.invalidateAfterReply({
          slug,
          parentCommentId: comment.id,
          mainCommentsParams: infiniteCommentsParams,
          replyHighlightedId: params.reply ?? undefined
        })
      }
    })
  )

  const submitCommentReply = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (!content) {
      toast.error(t('blog.comments.reply-cannot-be-empty'))
      return
    }

    commentsMutation.mutate({
      slug,
      content,
      parentId: comment.id,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })
  }

  const isAuthenticated = session !== null
  const disabled = !isAuthenticated || commentsMutation.isPending

  return (
    <form onSubmit={submitCommentReply}>
      <div className='relative'>
        <CommentEditor
          onChange={(e) => setContent(e.target.value)}
          onModEnter={submitCommentReply}
          onEscape={() => setIsReplying(false)}
          placeholder={t('blog.comments.reply-to-comment')}
          disabled={disabled}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- Autofocus is necessary because user is replying to a comment
          autoFocus
          data-testid='comment-textarea-reply'
        />
        {isAuthenticated ? null : <UnauthorizedOverlay />}
      </div>
      <div className='mt-2 space-x-1'>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='submit'
          disabled={disabled || !content}
          aria-disabled={disabled || !content}
          data-testid='comment-submit-reply-button'
        >
          {t('blog.comments.reply')}
        </Button>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          onClick={() => setIsReplying(false)}
        >
          {t('common.cancel')}
        </Button>
      </div>
    </form>
  )
}

export default CommentReply
