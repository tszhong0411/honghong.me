'use client'

import { Skeleton, Tooltip, TooltipContent, TooltipTrigger } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { type CommentContext, CommentProvider } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCommentParams } from '@/hooks/use-comment-params'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import type { CommentsOutput } from '@/trpc/routers/comments'

import Markdown from '../mdx/markdown'
import CommentActions from './comment-actions'
import CommentMenu from './comment-menu'
import CommentReplies from './comment-replies'
import CommentReply from './comment-reply'

type CommentProps = {
  comment: CommentsOutput['comments'][number]
}

const Comment = (props: CommentProps) => {
  const { comment } = props
  const { slug } = useCommentsContext()
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isOpenReplies, setIsOpenReplies] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)
  const [params] = useCommentParams()
  const [isHighlighted, setIsHighlighted] = useState(
    params.comment === comment.id || params.reply === comment.id
  )

  const {
    body,
    createdAt,
    isDeleted,
    parentId,
    user: { image, name, role },
    replies
  } = comment

  const formattedDate = useFormattedDate(comment.createdAt, {
    format: 'MMM DD, YYYY',
    relative: true
  })

  useOnClickOutside(commentRef, () => {
    setIsHighlighted(false)
  })

  const context = useMemo<CommentContext>(
    () => ({
      isEditing,
      isReplying,
      isOpenReplies,
      setIsEditing,
      setIsReplying,
      setIsOpenReplies,
      slug,
      comment
    }),
    [comment, isEditing, isOpenReplies, isReplying, slug]
  )

  useEffect(() => {
    if (isHighlighted && commentRef.current) {
      const top = commentRef.current.getBoundingClientRect().top + window.scrollY - 128

      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [isHighlighted])

  return (
    <CommentProvider value={context}>
      <div className='overflow-hidden'>
        <div
          ref={commentRef}
          className={cn('p-2 sm:px-4', {
            'bg-accent/50': isHighlighted
          })}
        >
          <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-sm'>
                <Image
                  src={image}
                  alt={name}
                  width={32}
                  height={32}
                  className='z-10 size-8 rounded-full'
                />
                <div className='font-semibold'>{name}</div>
                <div className='text-muted-foreground'>
                  {formattedDate ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <span>{formattedDate}</span>
                      </TooltipTrigger>
                      <TooltipContent>{new Date(createdAt).toString()}</TooltipContent>
                    </Tooltip>
                  ) : (
                    <Skeleton className='h-4 w-24' />
                  )}
                </div>
                {role === 'admin' ? (
                  <div className='rounded-full border border-red-500/50 bg-red-100/50 px-2 py-0.5 text-sm dark:bg-red-900/50'>
                    Author
                  </div>
                ) : null}
              </div>
              <CommentMenu />
            </div>

            {isDeleted ? (
              <p className='text-muted-foreground my-3 text-sm'>[This comment has been deleted]</p>
            ) : (
              <Markdown>{body}</Markdown>
            )}

            {isReplying ? <CommentReply /> : <CommentActions />}
          </div>
        </div>

        {!parentId && replies > 0 ? <CommentReplies /> : null}
      </div>
    </CommentProvider>
  )
}

export default Comment
