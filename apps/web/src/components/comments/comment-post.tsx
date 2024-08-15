'use client'

import type { JSONContent } from '@tiptap/core'
import { Button, toast } from '@tszhong0411/ui'
import { SendIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'

import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'

import CommentEditor, { type CommentEditorRef } from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'

const CommentPost = () => {
  const { slug } = useCommentsContext()
  const [content, setContent] = useState<JSONContent | null>(null)
  const { status } = useSession()
  const utils = api.useUtils()
  const editorRef = useRef<CommentEditorRef>(null)

  const commentsMutation = api.comments.post.useMutation({
    onSuccess: () => {
      setContent(null)
      editorRef.current?.clearContent()
      toast.success('Comment posted')
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => {
      utils.comments.invalidate()
    }
  })

  const commentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!content) {
      toast.error('Comment cannot be empty')

      return
    }

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
          ref={editorRef}
          onUpdate={setContent}
          placeholder='Leave comment'
          disabled={disabled}
        />
        <Button
          variant='ghost'
          size='icon'
          className='absolute bottom-1.5 right-2 size-7'
          type='submit'
          disabled={disabled || !content}
          aria-label='Send comment'
          aria-disabled={disabled || !content}
        >
          <SendIcon className='size-4' />
        </Button>
        {status === 'unauthenticated' ? <UnauthorizedOverlay /> : null}
      </div>
    </form>
  )
}

export default CommentPost
