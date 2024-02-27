'use client'
// TODO: Clean up the code 😵‍💫
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
  Skeleton,
  toast,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { ArrowUpIcon, MoreHorizontalIcon } from 'lucide-react'
import Image from 'next/image'
import { type User } from 'next-auth'
import * as React from 'react'

import {
  type Comment,
  deleteComment,
  type Reply,
  upvoteComment
} from '@/actions/comment'
import { type commentUpvotes } from '@/db/schema'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import { generateId } from '@/utils/generate-id'

import CommentBox from './comment-box'
import MarkdownPreview from './markdown-preview'

type CommentProps = {
  slug: string
  comment: Comment
  user: User | null
}

type ReplyProps = {
  slug: string
  reply: Reply
  user: User | null
}

const deleteCommentHandler = async (id: string) => {
  const result = await deleteComment(id)

  if (result.error) {
    toast.error(result.message)
  } else {
    toast.success(result.message)
  }
}

const Comment = (props: CommentProps) => {
  const {
    slug,
    comment: {
      id,
      user: { name, image, email, role },
      body,
      createdAt,
      replies,
      isDeleted,
      upvotes
    },
    user
  } = props

  const formattedDate = useFormattedDate(createdAt, {
    format: 'MMM DD, YYYY',
    relative: true
  })
  const [isReplying, setIsReplying] = React.useState(false)
  const [copy] = useCopyToClipboard()
  const [optimisticUpvotes, upvoteOptimistic] = React.useOptimistic<
    Array<typeof commentUpvotes.$inferSelect>,
    boolean
  >(upvotes, (state, isCurrentUserUpvotedComment) => {
    if (isCurrentUserUpvotedComment) {
      return state.filter((upvote) => upvote.userId !== user!.id)
    }

    return [
      ...state,
      {
        id: generateId(),
        userId: user ? (user.id as string) : generateId(),
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

  return (
    <div
      id={`comment-${id}`}
      key={id}
      className='scroll-mt-20 overflow-hidden rounded-lg border dark:bg-zinc-900/30'
    >
      <div className='border-b p-2 sm:px-4'>
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
                    {new Date(createdAt).toString()}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Skeleton className='h-4 w-24' />
              )}
            </div>
            {role === 'admin' && (
              <div className='rounded-full border border-red-500/50 bg-red-100/50 px-2 py-0.5 text-sm dark:bg-red-900/50'>
                Author
              </div>
            )}
          </div>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MoreHorizontalIcon className='size-[18px]' />
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
                  onClick={() => deleteCommentHandler(id)}
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
            className='p-4'
            commentId={id}
            compiledSource={body}
          />
        )}
        {isDeleted && (
          <p className='p-4 text-sm italic text-muted-foreground'>{body}</p>
        )}

        <button
          type='button'
          className={cn(
            'flex gap-2 rounded-xl border px-2 py-1 text-xs text-muted-foreground transition-colors',
            !user && 'cursor-not-allowed',
            user &&
              (isCurrentUserUpvotedComment
                ? 'border-red-500 bg-red-400/10 text-red-500 hover:bg-red-300/40 dark:bg-red-900/10 dark:hover:bg-red-900/40'
                : 'hover:bg-accent hover:text-accent-foreground')
          )}
          onClick={upvoteCommentHandler}
        >
          <ArrowUpIcon className='size-3.5' />
          {optimisticUpvotes.length}
        </button>
      </div>

      <div>
        {replies.length > 0 &&
          replies.map((reply) => (
            <Reply key={reply.id} user={user} slug={slug} reply={reply} />
          ))}
      </div>

      <div className='p-2 dark:bg-zinc-900/30 sm:px-3'>
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
              'w-full cursor-text rounded-lg border px-2 py-1 text-left text-sm text-muted-foreground',
              !user && 'cursor-not-allowed'
            )}
            onClick={() => user && setIsReplying(true)}
          >
            Write a reply
          </button>
        )}
      </div>
    </div>
  )
}

const Reply = (props: ReplyProps) => {
  const {
    slug,
    user,
    reply: {
      id,
      createdAt,
      user: { image, name, email, role },
      body
    }
  } = props

  const formattedDate = useFormattedDate(createdAt, {
    format: 'MMM DD, YYYY',
    relative: true
  })
  const [copy] = useCopyToClipboard()

  return (
    <div className='relative overflow-hidden rounded-lg before:absolute before:inset-y-0 before:left-8 before:w-0.5 before:bg-border first-of-type:pt-2 first-of-type:before:top-3 dark:bg-zinc-900/30'>
      <div className='px-2 sm:px-4'>
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
                    {new Date(createdAt).toString()}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Skeleton className='h-4 w-24' />
              )}
            </div>
            {role === 'admin' && (
              <div className='rounded-full border border-red-500/50 bg-red-100/50 px-2 py-0.5 text-sm dark:bg-red-900/50'>
                Author
              </div>
            )}
          </div>
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <MoreHorizontalIcon className='size-[18px]' />
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
                  {user && user.email === email && (
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
                  onClick={() => deleteCommentHandler(id)}
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <MarkdownPreview
          className='py-4 pl-10 pr-4'
          commentId={id}
          compiledSource={body}
        />
      </div>
    </div>
  )
}

export default Comment
