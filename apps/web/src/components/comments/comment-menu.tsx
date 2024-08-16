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
  toast
} from '@tszhong0411/ui'
import { MoreVerticalIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { api } from '@/trpc/react'

const CommentMenu = () => {
  const { comment, setIsReplying } = useCommentContext()
  const { slug } = useCommentsContext()
  const { data } = useSession()
  const utils = api.useUtils()
  const [copy] = useCopyToClipboard()

  const deleteCommentMutation = api.comments.delete.useMutation({
    onSuccess: () => toast.success('Deleted a comment'),
    onError: (error) => toast.error(error.message),
    onSettled: () => {
      utils.comments.invalidate()
    }
  })

  const {
    isDeleted,
    id,
    user: { id: userId },
    parentId
  } = comment

  const commentQuery = parentId ? `comment=${parentId}&reply=${id}` : `comment=${id}`

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            aria-label='Open menu'
            type='button'
          >
            <MoreVerticalIcon className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(e) => {
            // Prevent button focus when dropdown is closed to focus on reply textarea
            e.preventDefault()
          }}
          align='end'
        >
          <DropdownMenuItem
            onClick={() =>
              void copy({
                text: `${window.location.origin}/blog/${slug}?${commentQuery}`,
                successMessage: 'Link copied to clipboard'
              })
            }
          >
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsReplying({
                value: true,
                // Not sure if this will work in all cases
                // Wrap the reply in blockquote
                content: {
                  type: 'doc',
                  content: [
                    {
                      type: 'blockquote',
                      content: [...(comment.body.content ?? [])]
                    },
                    {
                      type: 'paragraph'
                    }
                  ]
                }
              })
            }}
          >
            Quote reply
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            {!isDeleted && data && data.user.id === userId ? (
              <DropdownMenuItem
                className='text-red-600 focus:text-red-500'
                disabled={deleteCommentMutation.isPending}
                aria-disabled={deleteCommentMutation.isPending}
              >
                Delete
              </DropdownMenuItem>
            ) : null}
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete a comment</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this comment? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteCommentMutation.mutate({ id })
            }}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CommentMenu
