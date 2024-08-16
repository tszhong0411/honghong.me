'use client'

import type { Editor, JSONContent } from '@tiptap/core'
import { Button, toast } from '@tszhong0411/ui'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'

const CommentReply = () => {
  const [content, setContent] = useState<JSONContent | null>(null)
  const [editor, setEditor] = useState<Editor | null>(null)
  const { comment, isReplying, setIsReplying } = useCommentContext()
  const { status } = useSession()
  const { slug, sort } = useCommentsContext()
  const utils = api.useUtils()
  const editorRef = useCallback((e: Editor | null) => {
    if (e !== null) setEditor(e)
  }, [])

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
      setIsReplying({ value: false })
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

    if (!content || editor?.isEmpty) {
      toast.error('Reply cannot be empty')

      return
    }

    commentsMutation.mutate({
      slug,
      content,
      parentId: comment.id
    })
  }

  useEffect(() => {
    if (editor && isReplying.content) {
      editor.commands.insertContent(isReplying.content)

      setTimeout(() => {
        editor.commands.focus('end')
      }, 0)
    }
  }, [editor, isReplying.content, isReplying.value])

  const disabled = status === 'unauthenticated' || commentsMutation.isPending

  return (
    <form onSubmit={replyHandler}>
      <div className='relative'>
        <CommentEditor
          onUpdate={setContent}
          onModEnter={replyHandler}
          onEscape={() => {
            setIsReplying({ value: false })
          }}
          ref={editorRef}
          placeholder='Reply to comment'
          disabled={disabled}
          autofocus
        />
        {status === 'unauthenticated' ? <UnauthorizedOverlay /> : null}
      </div>
      <div className='mt-2 space-x-1'>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='submit'
          disabled={disabled || !content || editor?.isEmpty}
          aria-disabled={disabled || !content || editor?.isEmpty}
        >
          Reply
        </Button>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='button'
          onClick={() => {
            setIsReplying({ value: false })
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default CommentReply
