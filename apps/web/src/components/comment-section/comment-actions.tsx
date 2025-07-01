import NumberFlow from '@number-flow/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { Button, buttonVariants, toast } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { cva } from 'cva'
import { ChevronDownIcon, MessageSquareIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'

import { useCommentParams } from '@/hooks/use-comment-params'
import { useSession } from '@/lib/auth-client'
import { useORPCInvalidator } from '@/lib/orpc-invalidator'
import { createORPCQueryKeys } from '@/lib/orpc-query-helpers'
import { orpc } from '@/orpc/client'
import { useCommentStore } from '@/stores/comment'
import { useCommentsStore } from '@/stores/comments'
import { useRatesStore } from '@/stores/rates'

const rateVariants = cva({
  base: buttonVariants({
    variant: 'secondary',
    className: 'h-8 gap-1.5 px-2 font-mono text-xs font-medium'
  }),
  variants: {
    active: {
      true: 'bg-accent text-accent-foreground',
      false: 'text-muted-foreground'
    }
  }
})

const CommentActions = () => {
  const { slug, sort } = useCommentsStore((state) => ({ slug: state.slug, sort: state.sort }))
  const { comment, setIsReplying, isOpenReplies, setIsOpenReplies } = useCommentStore((state) => ({
    comment: state.comment,
    setIsReplying: state.setIsReplying,
    isOpenReplies: state.isOpenReplies,
    setIsOpenReplies: state.setIsOpenReplies
  }))
  const { increment, decrement, getCount } = useRatesStore((state) => ({
    increment: state.increment,
    decrement: state.decrement,
    getCount: state.getCount
  }))
  const [params] = useCommentParams()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const invalidator = useORPCInvalidator()
  const t = useTranslations()

  const queryKeys = createORPCQueryKeys()
  const infiniteCommentsParams = {
    slug,
    sort: comment.parentId ? 'oldest' : sort,
    parentId: comment.parentId ?? undefined,
    type: comment.parentId ? 'replies' : 'comments',
    highlightedCommentId: comment.parentId
      ? (params.reply ?? undefined)
      : (params.comment ?? undefined)
  } as const

  const ratesSetMutation = useMutation(
    orpc.rates.createRate.mutationOptions({
      onMutate: async (newData) => {
        increment()

        const queryKey = queryKeys.comments.infiniteComments(infiniteCommentsParams)
        await queryClient.cancelQueries({ queryKey })

        const previousData = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData) return { pages: [], pageParams: [] }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((c) => {
                if (c.id === newData.id) {
                  let likeCount: number = c.likeCount
                  let dislikeCount: number = c.dislikeCount

                  if (c.liked === true) likeCount--
                  if (c.liked === false) dislikeCount--

                  if (newData.like === true) likeCount++
                  if (newData.like === false) dislikeCount++

                  return {
                    ...c,
                    likeCount,
                    dislikeCount,
                    liked: newData.like
                  }
                }

                return c
              })
            }))
          }
        })

        return { previousData }
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
        decrement()

        if (getCount() === 0) {
          await invalidator.combinations.afterRateComment(infiniteCommentsParams)
        }
      }
    })
  )

  const isAuthenticated = session !== null

  const handleRateComment = (like: boolean) => {
    if (!isAuthenticated) {
      toast.error(t('blog.comments.need-logged-in-to-rate'))
      return
    }
    ratesSetMutation.mutate({ id: comment.id, like: like === comment.liked ? null : like })
  }

  const hasReplies = !comment.parentId && comment.replyCount > 0

  return (
    <>
      <div className='flex gap-1'>
        <Button
          variant='secondary'
          onClick={() => handleRateComment(true)}
          className={rateVariants({
            active: comment.liked === true
          })}
          aria-label={t('blog.comments.like')}
        >
          <ThumbsUpIcon />
          <NumberFlow value={comment.likeCount} />
        </Button>
        <Button
          variant='secondary'
          onClick={() => handleRateComment(false)}
          className={rateVariants({
            active: comment.liked === false
          })}
          aria-label={t('blog.comments.dislike')}
        >
          <ThumbsDownIcon />
          <NumberFlow value={comment.dislikeCount} />
        </Button>
        {comment.parentId ? null : (
          <Button
            variant='secondary'
            className='text-muted-foreground h-8 gap-1.5 px-2 text-xs font-medium'
            onClick={() => setIsReplying(true)}
            data-testid='comment-reply-button'
          >
            <MessageSquareIcon />
            {t('blog.comments.reply')}
          </Button>
        )}
      </div>
      {hasReplies && (
        <Button
          variant='ghost'
          size='sm'
          className='mt-4 h-8 gap-1.5 px-2 text-xs font-medium'
          onClick={() => setIsOpenReplies(!isOpenReplies)}
          data-testid='comment-replies-expand-button'
        >
          <ChevronDownIcon
            className={cn('size-4 transition-transform duration-200', {
              'rotate-180': isOpenReplies
            })}
          />
          <NumberFlow value={comment.replyCount} data-testid='comment-reply-count' />
          {t('blog.comments.replies', { count: comment.replyCount })}
        </Button>
      )}
    </>
  )
}

export default CommentActions
