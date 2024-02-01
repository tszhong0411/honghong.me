'use client'
// TODO: Clean up the code
import { type CommentUpvote } from '@prisma/client'
import { IconArrowUp, IconDots } from '@tabler/icons-react'
import Image from 'next/image'
import { type User } from 'next-auth'
import React from 'react'
import { toast } from 'sonner'

import {
  type CommentWithReplies,
  deleteComment,
  upvoteComment
} from '@/actions/comment'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import cn from '@/utils/cn'
import generateId from '@/utils/generate-id'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton
} from '../ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import CommentBox from './comment-box'
import MarkdownPreview from './markdown-preview'

type CommentProps = {
  slug: string
  comment: CommentWithReplies
  user: User | null
}

const Comment = (props: CommentProps) => {
  const {
    slug,
    comment: {
      id,
      user: { name, image, email, role },
      body,
      created_at,
      replies,
      parentId,
      isDeleted,
      upvotes
    },
    user
  } = props

  const formattedDate = useFormattedDate(created_at)
  const [isReplying, setIsReplying] = React.useState(false)
  const [copy] = useCopyToClipboard()
  const [optimisticUpvotes, upvoteOptimistic] = React.useOptimistic<
    CommentUpvote[],
    boolean
  >(upvotes, (state, isCurrentUserUpvotedComment) => {
    if (isCurrentUserUpvotedComment) {
      return state.filter((upvote) => upvote.userId !== user!.id)
    }

    return [
      ...state,
      {
        id: generateId(),
        userId: user ? user.id : generateId(),
        commentId: id
      }
    ]
  })

  const isCurrentUserUpvotedComment = optimisticUpvotes.some(
    (upvote) => upvote.userId === user?.id
  )

  const upvoteCommentHandler = async () => {
    if (!user) return

    React.startTransition(() => upvoteOptimistic(isCurrentUserUpvotedComment))
    await upvoteComment(id)
  }

  const deleteCommentHandler = async () => {
    const result = await deleteComment(id)

    if (result.error) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }
  }

  return (
    <div
      id={`comment-${id}`}
      key={id}
      className={cn(
        'rounded-lg bg-accent',
        parentId
          ? [
              'relative bg-background first-of-type:pt-2',
              'before:absolute before:inset-y-0 before:left-8 before:w-0.5 before:bg-border first-of-type:before:top-3'
            ]
          : 'scroll-mt-20 border'
      )}
    >
      <div className={cn('px-4', !parentId && 'border-b py-2')}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm'>
            <Image
              src={image as string}
              alt={name as string}
              width={32}
              height={32}
              className='z-10 rounded-full'
            />
            <div className='font-semibold'>{name}</div>
            <div className='text-muted-foreground'>
              {formattedDate ? (
                <Tooltip>
                  <TooltipTrigger>
                    <span>{formattedDate}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {new Date(created_at).toString()}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Skeleton className='h-4 w-24' />
              )}
            </div>
            {role === 'admin' && (
              <div className='rounded-full border border-red-500/50 px-2 py-0.5 text-sm'>
                Author
              </div>
            )}
          </div>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <IconDots size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() =>
                    copy({
                      text: `${window.location.origin}/blog/${slug}#comment-${id}`,
                      successMessage: 'Link copied to clipboard'
                    })
                  }
                >
                  Copy link
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  {!isDeleted && user && user.email === email && (
                    <DropdownMenuItem className='text-red-600 focus:text-red-500'>
                      Delete
                    </DropdownMenuItem>
                  )}
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete a comment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this comment? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={deleteCommentHandler}
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {!isDeleted && (
          <MarkdownPreview
            className={cn('py-4', parentId ? 'pl-10 pr-4' : 'px-4')}
            commentId={id}
            compiledSource={body}
          />
        )}
        {isDeleted && (
          <p className='p-4 text-sm italic text-muted-foreground'>{body}</p>
        )}

        {!parentId && (
          <button
            type='button'
            className={cn(
              'flex gap-2 rounded-xl border px-2 py-1 text-xs text-zinc-400 transition-colors duration-150',
              !user && 'cursor-not-allowed',
              user &&
                (isCurrentUserUpvotedComment
                  ? 'border-red-500 bg-red-900/10 text-red-500 hover:bg-red-900/40'
                  : 'hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300')
            )}
            onClick={upvoteCommentHandler}
          >
            <IconArrowUp size={14} />
            {optimisticUpvotes.length}
          </button>
        )}
      </div>

      <div>
        {replies.length > 0 &&
          replies.map((reply) => (
            <Comment key={reply.id} user={user} slug={slug} comment={reply} />
          ))}
      </div>

      {!parentId && (
        <div className='rounded-b-lg bg-accent px-3 py-2'>
          {isReplying ? (
            <CommentBox
              slug={slug}
              parentId={id}
              onCancel={() => setIsReplying(false)}
            />
          ) : (
            <button
              type='button'
              className={cn(
                'w-full cursor-text rounded-lg border bg-background px-2 py-1 text-left text-sm text-muted-foreground',
                !user && 'cursor-not-allowed'
              )}
              onClick={() => user && setIsReplying(true)}
            >
              Write a reply
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Comment
