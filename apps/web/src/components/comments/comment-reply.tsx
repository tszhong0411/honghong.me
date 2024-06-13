'use client'

import { Button, toast } from '@tszhong0411/ui'
import { useSession } from 'next-auth/react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'

import CommentEditor, { useCommentEditor } from './comment-editor'

const CommentReply = () => {
  const [editor, setEditor] = useCommentEditor()
  const { comment, setIsReplying } = useCommentContext()
  const { status } = useSession()
  const { slug } = useCommentsContext()
  const utils = api.useUtils()

  const commentsMutation = api.comments.post.useMutation({
    onSuccess: () => {
      setIsReplying(false)
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => utils.comments.get.invalidate()
  })

  const replyHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!editor) return
    if (editor.isEmpty) {
      toast.error('Reply cannot be empty')

      return
    }

    const content = editor.getValue()

    commentsMutation.mutate({
      slug,
      content,
      parentId: comment.id
    })
  }

  const disabled = status !== 'authenticated' || commentsMutation.isPending

  return (
    <form onSubmit={replyHandler}>
      <CommentEditor
        editor={editor}
        onChange={setEditor}
        placeholder='Reply to comment'
        disabled={disabled}
      />
      <div className='mt-2 space-x-1'>
        <Button
          variant='secondary'
          className='h-8 px-2 text-xs font-medium'
          type='submit'
          disabled={disabled || !editor || editor.isEmpty}
          aria-disabled={disabled || !editor || editor.isEmpty}
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
