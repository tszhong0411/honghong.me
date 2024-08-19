'use client'

import { Button, toast } from '@tszhong0411/ui'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'

const CommentReply = () => {
  const [content, setContent] = useState('')
  const { comment, setIsReplying } = useCommentContext()
  const { status } = useSession()
  const { slug, sort } = useCommentsContext()
  const utils = api.useUtils()

  const queryKey: CommentsInput = {
    slug,
    sort
  }

  const commentsMutation = api.comments.post.useMutation({
    onMutate: async () => {
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
                if (c.id === comment.id) {
                  return {
                    ...c,
                    replies: c.replies + 1
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
    onSuccess: () => {
      setIsReplying(false)
    },
    onError: (error, _, ctx) => {
      if (ctx?.previousData) {
        utils.comments.getInfiniteComments.setInfiniteData(queryKey, ctx.previousData)
      }
      toast.error(error.message)
    },
    onSettled: () => {
      utils.comments.invalidate()
    }
  })

  const replyHandler = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (!content) {
      toast.error('Reply cannot be empty')

      return
    }

    commentsMutation.mutate({
      slug,
      content,
      parentId: comment.id
    })
  }

  const disabled = status === 'unauthenticated' || commentsMutation.isPending

  return (
    <form onSubmit={replyHandler}>
      <div className='relative'>
        <CommentEditor
          onChange={(e) => {
            setContent(e.target.value)
          }}
          onModEnter={replyHandler}
          onEscape={() => {
            setIsReplying(false)
          }}
          placeholder='Reply to comment'
          disabled={disabled}
          // eslint-disable-next-line jsx-a11y/no-autofocus -- Autofocus is necessary because user is replying to a comment
          autoFocus
        />
        {status === 'unauthenticated' ? <UnauthorizedOverlay /> : null}
      </div>
      <div className='mt-2 space-x-1'>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='submit'
          disabled={disabled || !content}
          aria-disabled={disabled || !content}
        >
          Reply
        </Button>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='button'
          onClick={() => {
            setIsReplying(false)
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default CommentReply
