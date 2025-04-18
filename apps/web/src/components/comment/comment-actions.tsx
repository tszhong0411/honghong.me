import NumberFlow from '@number-flow/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { Button, buttonVariants, toast } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { cva } from 'cva'
import { ChevronDownIcon, MessageSquareIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useRatesContext } from '@/contexts/rates'
import { useCommentParams } from '@/hooks/use-comment-params'
import { useSession } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client'

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
  const { slug, sort } = useCommentsContext()
  const { comment, setIsReplying, isOpenReplies, setIsOpenReplies } = useCommentContext()
  const { increment, decrement, getCount } = useRatesContext()
  const [params] = useCommentParams()
  const { data: session } = useSession()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const t = useTranslations()

  const queryKey = {
    slug,
    sort: comment.parentId ? 'oldest' : sort,
    parentId: comment.parentId ?? undefined,
    type: comment.parentId ? 'replies' : 'comments',
    highlightedCommentId: comment.parentId
      ? (params.reply ?? undefined)
      : (params.comment ?? undefined)
  } as const

  const ratesSetMutation = useMutation(
    trpc.rates.set.mutationOptions({
      onMutate: async (newData) => {
        increment()

        await queryClient.cancelQueries({
          queryKey: trpc.comments.getInfiniteComments.infiniteQueryKey(queryKey)
        })

        const previousData = queryClient.getQueryData(
          trpc.comments.getInfiniteComments.infiniteQueryKey(queryKey)
        )

        queryClient.setQueryData(
          trpc.comments.getInfiniteComments.infiniteQueryKey(queryKey),
          (oldData) => {
            if (!oldData) {
              return {
                pages: [],
                pageParams: []
              }
            }

            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  comments: page.comments.map((c) => {
                    if (c.id === newData.id) {
                      let likes: number = c.likes
                      let dislikes: number = c.dislikes

                      if (c.liked === true) likes--
                      if (c.liked === false) dislikes--

                      if (newData.like === true) likes++
                      if (newData.like === false) dislikes++

                      return {
                        ...c,
                        likes,
                        dislikes,
                        liked: newData.like
                      }
                    }

                    return c
                  })
                }
              })
            }
          }
        )

        return { previousData }
      },
      onError: (error, _, ctx) => {
        if (ctx?.previousData) {
          queryClient.setQueryData(
            trpc.comments.getInfiniteComments.infiniteQueryKey(queryKey),
            ctx.previousData
          )
        }
        toast.error(error.message)
      },
      onSettled: () => {
        decrement()

        if (getCount() === 0) {
          queryClient.invalidateQueries({
            queryKey: trpc.comments.getInfiniteComments.infiniteQueryKey(queryKey)
          })
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

  const hasReplies = !comment.parentId && comment.replies > 0

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
          <NumberFlow value={comment.likes} />
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
          <NumberFlow value={comment.dislikes} />
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
          <NumberFlow value={comment.replies} data-testid='comment-reply-count' />
          {t('blog.comments.replies', { count: comment.replies })}
        </Button>
      )}
    </>
  )
}

export default CommentActions
