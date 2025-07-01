'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { Badge, Skeleton, Tooltip, TooltipContent, TooltipTrigger } from '@tszhong0411/ui'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { useCommentParams } from '@/hooks/use-comment-params'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import { useCommentStore } from '@/stores/comment'
import { getDefaultImage } from '@/utils/get-default-image'

import Markdown from '../mdx/markdown'

import CommentActions from './comment-actions'
import CommentMenu from './comment-menu'
import CommentReplies from './comment-replies'
import CommentReply from './comment-reply'

const Comment = () => {
  const commentRef = useRef<HTMLDivElement>(null)
  const { comment, isReplying } = useCommentStore((state) => ({
    comment: state.comment,
    isReplying: state.isReplying
  }))
  const [params] = useCommentParams()
  const t = useTranslations()

  const isHighlighted = params.reply ? params.reply === comment.id : params.comment === comment.id

  const {
    id,
    body,
    createdAt,
    isDeleted,
    parentId,
    user: { id: userId, image, name, role },
    replyCount
  } = comment

  const formattedDate = useFormattedDate(comment.createdAt, {
    relative: true
  })

  useEffect(() => {
    if (isHighlighted && commentRef.current) {
      const top = commentRef.current.getBoundingClientRect().top + window.scrollY - 128

      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [isHighlighted])

  const hasReplies = !parentId && replyCount > 0

  const defaultImage = getDefaultImage(userId)

  return (
    <>
      <div ref={commentRef} className='p-2.5' data-testid={`comment-${id}`}>
        {isHighlighted && <Badge className='mb-4'>{t('blog.comments.highlighted-comment')}</Badge>}
        <div className='flex gap-4'>
          <Image
            src={image ?? defaultImage}
            alt={name}
            width={32}
            height={32}
            className='z-10 size-8 rounded-full'
          />
          <div className='flex-1 overflow-hidden'>
            <div className='ml-0.5 flex h-8 items-center justify-between'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='font-semibold'>{name}</div>
                <div className='text-muted-foreground'>
                  {formattedDate ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <span>{formattedDate}</span>
                      </TooltipTrigger>
                      <TooltipContent>{new Date(createdAt).toLocaleString()}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Skeleton className='h-4 w-24' />
                  )}
                </div>
                {role === 'admin' && (
                  <div className='rounded-full border border-red-500/50 bg-red-100/50 px-2 py-0.5 text-sm dark:bg-red-900/50'>
                    {t('blog.comments.author')}
                  </div>
                )}
              </div>
              <CommentMenu />
            </div>

            {isDeleted ? (
              <p className='text-muted-foreground my-3 ml-0.5 text-sm'>
                {t('blog.comments.this-comment-has-been-deleted')}
              </p>
            ) : (
              <Markdown>{body}</Markdown>
            )}

            {isReplying ? <CommentReply /> : <CommentActions />}
          </div>
        </div>
      </div>
      {hasReplies && <CommentReplies />}
    </>
  )
}

export default Comment
