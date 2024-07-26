'use client'

import { Button, toast } from '@tszhong0411/ui'
import { SendIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useCommentsContext } from '@/contexts/comments'
import { setModals } from '@/store/modals'
import { api } from '@/trpc/react'

import CommentEditor, { useCommentEditor } from './comment-editor'

const CommentPost = () => {
  const { slug } = useCommentsContext()
  const [editor, setEditor] = useCommentEditor()
  const { status } = useSession()
  const utils = api.useUtils()

  const commentsMutation = api.comments.post.useMutation({
    onSuccess: () => {
      editor?.clearValue()
      toast.success('Comment posted')
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => utils.comments.get.invalidate()
  })

  const commentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!editor) return
    if (editor.isEmpty) {
      toast.error('Comment cannot be empty')

      return
    }

    const content = editor.getValue()

    commentsMutation.mutate({
      slug,
      content
    })
  }

  const disabled = status !== 'authenticated' || commentsMutation.isPending

  return (
    <form onSubmit={commentHandler}>
      <div className='relative'>
        <CommentEditor
          editor={editor}
          onChange={setEditor}
          placeholder='Leave comment'
          disabled={disabled}
        />
        <Button
          variant='ghost'
          size='icon'
          className='absolute bottom-1.5 right-2 size-7'
          type='submit'
          disabled={disabled || !editor || editor.isEmpty}
          aria-label='Send comment'
          aria-disabled={disabled || !editor || editor.isEmpty}
        >
          <SendIcon className='size-4' />
        </Button>
        {status === 'unauthenticated' ? (
          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]'>
            <Button
              type='button'
              onClick={() => {
                setModals({ signIn: true })
              }}
            >
              Sign In
            </Button>
          </div>
        ) : null}
      </div>
    </form>
  )
}

export default CommentPost
