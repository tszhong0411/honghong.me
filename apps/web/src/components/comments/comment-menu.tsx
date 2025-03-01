import { useTranslations } from '@tszhong0411/i18n/client'
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

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useSession } from '@/lib/auth-client'
import { api } from '@/trpc/react'

const CommentMenu = () => {
  const { comment } = useCommentContext()
  const { slug } = useCommentsContext()
  const { data: session } = useSession()
  const utils = api.useUtils()
  const [copy] = useCopyToClipboard()
  const t = useTranslations()

  const deleteCommentMutation = api.comments.delete.useMutation({
    onSuccess: () => toast.success(t('blog.comments.deleted-a-comment')),
    onError: (error) => toast.error(error.message),
    onSettled: () => utils.comments.invalidate()
  })

  const {
    isDeleted,
    id,
    user: { id: userId },
    parentId
  } = comment

  const commentQuery = parentId ? `comment=${parentId}&reply=${id}` : `comment=${id}`

  const isAuthor = !isDeleted && session?.user.id === userId

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            aria-label={t('blog.comments.open-menu')}
          >
            <MoreVerticalIcon className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() =>
              void copy({
                text: `${globalThis.location.origin}/blog/${slug}?${commentQuery}`,
                successMessage: t('blog.comments.link-copied')
              })
            }
          >
            {t('blog.comments.copy-link')}
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            {isAuthor ? (
              <DropdownMenuItem
                className='text-red-600 focus:text-red-500'
                disabled={deleteCommentMutation.isPending}
                aria-disabled={deleteCommentMutation.isPending}
              >
                {t('common.delete')}
              </DropdownMenuItem>
            ) : null}
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('blog.comments.delete-a-comment')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('blog.comments.confirm-delete-comment')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteCommentMutation.mutate({ id })}
            className={buttonVariants({ variant: 'destructive' })}
          >
            {t('common.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CommentMenu
