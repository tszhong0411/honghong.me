'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { Button, toast } from '@tszhong0411/ui'
import { SendIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useCommentsContext } from '@/contexts/comments'
import { useCommentParams } from '@/hooks/use-comment-params'
import { useSession } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client'

import CommentEditor from './comment-editor'
import UnauthorizedOverlay from './unauthorized-overlay'

const CommentPost = () => {
  const { slug, sort } = useCommentsContext()
  const [params] = useCommentParams()
  const [content, setContent] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { data: session, isPending } = useSession()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const t = useTranslations()

  const commentsMutation = useMutation(
    trpc.comments.post.mutationOptions({
      onSuccess: () => {
        setContent('')
        toast.success(t('blog.comments.comment-posted'))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.comments.getInfiniteComments.infiniteQueryKey({
            slug,
            sort,
            type: 'comments',
            highlightedCommentId: params.comment ?? undefined
          })
        })
        queryClient.invalidateQueries({
          queryKey: trpc.comments.getCommentsCount.queryKey({ slug })
        })
        queryClient.invalidateQueries({
          queryKey: trpc.comments.getRepliesCount.queryKey({ slug })
        })
        queryClient.invalidateQueries({
          queryKey: trpc.comments.getTotalCommentsCount.queryKey({ slug })
        })
      }
    })
  )

  const submitComment = () => {
    if (!content) {
      toast.error(t('blog.comments.comment-cannot-be-empty'))

      return
    }

    commentsMutation.mutate({
      slug,
      content: content,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })
  }

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  if (isPending || !isMounted) return null

  const disabled = session === null || commentsMutation.isPending

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submitComment()
      }}
    >
      <div className='relative'>
        <CommentEditor
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
          onModEnter={submitComment}
          placeholder={t('blog.comments.placeholder')}
          disabled={disabled}
          data-testid='comment-textarea-post'
        />
        <Button
          variant='ghost'
          size='icon'
          className='absolute bottom-1.5 right-2 size-7'
          type='submit'
          disabled={disabled || !content}
          aria-label={t('blog.comments.send-comment')}
          aria-disabled={disabled || !content}
          data-testid='comment-submit-button'
        >
          <SendIcon />
        </Button>
        {session === null && <UnauthorizedOverlay />}
      </div>
    </form>
  )
}

export default CommentPost
