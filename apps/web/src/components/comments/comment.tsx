'use client'

import { Skeleton, Tooltip, TooltipContent, TooltipTrigger } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import Image from 'next/image'
import { useMemo, useState } from 'react'

import { type CommentContext, CommentProvider } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import type { CommentsOutput } from '@/trpc/routers/comments'

import CommentActions from './comment-actions'
import CommentEditor, { useCommentEditor } from './comment-editor'
import CommentMenu from './comment-menu'
import CommentReplies from './comment-replies'
import CommentReply from './comment-reply'

type CommentProps = {
  comment: CommentsOutput[number]
}

const deletedBody = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          marks: [
            {
              type: 'italic'
            }
          ],
          text: '[This comment has been deleted]'
        }
      ]
    }
  ]
}

const Comment = (props: CommentProps) => {
  const { comment } = props
  const { slug } = useCommentsContext()
  const [editor, setEditor] = useCommentEditor()
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [isOpenReplies, setIsOpenReplies] = useState(false)

  const formattedDate = useFormattedDate(comment.createdAt, {
    format: 'MMM DD, YYYY',
    relative: true
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

  const {
    body,
    createdAt,
    id,
    isDeleted,
    parentId,
    user: { image, name, role },
    replies
  } = comment

  return (
    <CommentProvider value={context}>
      <div
        key={id}
        className='overflow-hidden'
        id={parentId ? `comment-${parentId}-${id}` : `comment-${id}`}
      >
        <div className='flex gap-2 p-2 sm:px-4'>
          <Image
            src={image}
            alt={name}
            width={32}
            height={32}
            className='z-10 size-8 rounded-full'
          />

          <div className='flex-1 space-y-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-sm'>
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

            <div className={cn(isDeleted && 'text-muted-foreground text-sm')}>
              <CommentEditor
                editor={editor}
                onChange={setEditor}
                content={isDeleted ? deletedBody : body}
                editable={false}
              />
            </div>
            {isReplying ? <CommentReply /> : <CommentActions />}
          </div>
        </div>

        {!parentId && replies > 0 ? <CommentReplies /> : null}
      </div>
    </CommentProvider>
  )
}

export default Comment
