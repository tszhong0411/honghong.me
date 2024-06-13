import type { UseTRPCMutationOptions } from '@trpc/react-query/shared'
import { Button, buttonVariants } from '@tszhong0411/ui'
import { cva } from 'class-variance-authority'
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useRatesContext } from '@/contexts/rates'
import { api, type RouterInputs } from '@/trpc/react'
import type { CommentsOutput } from '@/trpc/routers/comments'

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
  const { comment, setIsReplying } = useCommentContext()
  const { increment, decrement, getCount } = useRatesContext()
  const { slug } = useCommentsContext()
  const { status } = useSession()
  const utils = api.useUtils()

  const mutationOptions: UseTRPCMutationOptions<
    RouterInputs['rates']['set'] | RouterInputs['rates']['delete'],
    unknown,
    void,
    {
      previousData: CommentsOutput | undefined
    }
  > = {
    onMutate: (newData) => {
      increment()
      void utils.comments.get.cancel()

      const target = {
        slug,
        sort: 'newest',
        ...(comment.parentId ? { parentId: comment.parentId } : {})
      } as const

      const previousData = utils.comments.get.getData(target)

      utils.comments.get.setData(target, (oldData) => {
        if (!oldData) return oldData

        return oldData.map((c) => {
          if (c.id === newData.id) {
            const hasLike = 'like' in newData

            let likes: number = c.likes
            let dislikes: number = c.dislikes

            if (c.liked === true) likes--
            if (c.liked === false) dislikes--

            if (hasLike && newData.like) likes++
            if (hasLike && !newData.like) dislikes++

            return {
              ...c,
              likes,
              dislikes,
              liked: hasLike ? newData.like : undefined
            }
          }

          return c
        })
      })

      return { previousData }
    },
    onError: (_, __, ctx) => {
      if (ctx?.previousData) {
        utils.comments.get.setData({ slug }, ctx.previousData)
      }
    },
    onSettled: () => {
      decrement()

      if (getCount() === 0) {
        void utils.comments.get.invalidate()
      }
    }
  }

  const ratesSetMutation = api.rates.set.useMutation(mutationOptions)
  const ratesDeleteMutation = api.rates.delete.useMutation(mutationOptions)

  const isAuthenticated = status === 'authenticated'

  const rateHandler = (like: boolean) => {
    if (like === comment.liked) {
      ratesDeleteMutation.mutate({ id: comment.id })
    } else {
      ratesSetMutation.mutate({ id: comment.id, like })
    }
  }

  return (
    <div className='flex gap-1'>
      <Button
        type='button'
        variant='secondary'
        onClick={() => {
          rateHandler(true)
        }}
        className={rateVariants({
          active: comment.liked === true || !isAuthenticated
        })}
        aria-label='Like'
        disabled={!isAuthenticated}
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
          active: comment.liked === false || !isAuthenticated
        })}
        aria-label='Dislike'
        disabled={!isAuthenticated}
      >
        <ThumbsDownIcon className='size-4' />
        {comment.dislikes}
      </Button>
      {!comment.parentId && isAuthenticated ? (
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
      ) : null}
    </div>
  )
}

export default CommentActions
