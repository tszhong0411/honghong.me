'use client'

import { Button, toast } from '@tszhong0411/ui'
import { SendIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'

import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'

const CommentPost = () => {
  const { slug } = useCommentsContext()
  const [content, setContent] = useState('')
  const { status } = useSession()
  const utils = api.useUtils()

  const commentsMutation = api.comments.post.useMutation({
    onSuccess: () => {
      setContent('')
      toast.success('Comment posted')
    },
    onError: (error) => toast.error(error.message),
    onSettled: () => {
      utils.comments.invalidate()
    }
  })

  const commentHandler = (value?: string) => {
    if (!content && !value) {
      toast.error('Comment cannot be empty')

      return
    }

    commentsMutation.mutate({
      slug,
      content: value ?? content
    })
  }

  const disabled = status !== 'authenticated' || commentsMutation.isPending

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        commentHandler()
      }}
    >
      <div className='relative'>
        <CommentEditor
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          onModEnter={commentHandler}
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
