import { Button, buttonVariants, toast } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon, ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import pluralize from 'pluralize'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useRatesContext } from '@/contexts/rates'
import { useCommentParams } from '@/hooks/use-comment-params'
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

const rateVariants = cva(
  buttonVariants({
    variant: 'secondary',
    className: 'h-8 gap-1.5 px-2 font-mono text-xs font-medium'
  }),
  {
    variants: {
      active: {
        true: 'bg-accent text-accent-foreground',
        false: 'text-muted-foreground'
      }
    }
  }
)

const CommentActions = () => {
  const { comment, setIsReplying, isOpenReplies, setIsOpenReplies } = useCommentContext()
  const { increment, decrement, getCount } = useRatesContext()
  const { slug, sort } = useCommentsContext()
  const { status } = useSession()
  const utils = api.useUtils()
  const [params] = useCommentParams()

  const queryKey: CommentsInput = {
    slug,
    ...(comment.parentId
      ? {
          parentId: comment.parentId,
          sort: 'oldest',
          type: 'replies',
          ...(params.reply ? { highlightedCommentId: params.reply } : {})
        }
      : { sort, ...(params.comment ? { highlightedCommentId: params.comment } : {}) })
  }

  const ratesSetMutation = api.rates.set.useMutation({
    onMutate: async (newData) => {
      increment()

      await utils.comments.getInfiniteComments.cancel(queryKey)

      const previousData = utils.comments.getInfiniteComments.getInfiniteData(queryKey)

      utils.comments.getInfiniteComments.setInfiniteData(queryKey, (oldData) => {
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
      })

      return { previousData }
    },
    onError: (error, _, ctx) => {
      if (ctx?.previousData) {
        utils.comments.getInfiniteComments.setInfiniteData(queryKey, ctx.previousData)
      }
      toast.error(error.message)
    },
    onSettled: () => {
      decrement()

      if (getCount() === 0) {
        void utils.comments.getInfiniteComments.invalidate()
      }
    }
  })

  const isAuthenticated = status === 'authenticated'

  const rateHandler = (like: boolean) => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to rate comments')
      return
    }
    ratesSetMutation.mutate({ id: comment.id, like: like === comment.liked ? null : like })
  }

  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-1'>
        <Button
          type='button'
          variant='secondary'
          onClick={() => {
            rateHandler(true)
          }}
          className={rateVariants({
            active: comment.liked === true
          })}
          aria-label='Like'
        >
          <ThumbsUpIcon className='size-4' />
          {comment.likes}
        </Button>
        <Button
          type='button'
          variant='secondary'
          onClick={() => {
            rateHandler(false)
          }}
          className={rateVariants({
            active: comment.liked === false
          })}
          aria-label='Dislike'
        >
          <ThumbsDownIcon className='size-4' />
          {comment.dislikes}
        </Button>
        {comment.parentId ? null : (
          <Button
            type='button'
            variant='secondary'
            className='text-muted-foreground h-8 px-2 text-xs font-medium'
            onClick={() => {
              setIsReplying(true)
            }}
          >
            Reply
          </Button>
        )}
      </div>
      {!comment.parentId && comment.replies > 0 ? (
        <Button
          variant='ghost'
          size='sm'
          className='h-8 gap-1.5 px-2 text-xs font-medium'
          onClick={() => {
            setIsOpenReplies(!isOpenReplies)
          }}
          type='button'
        >
          <ChevronDownIcon
            className={cn('size-4 transition-transform', {
              'rotate-180': isOpenReplies
            })}
          />
          {pluralize('reply', comment.replies, true)}
        </Button>
      ) : null}
    </div>
  )
}

export default CommentActions
