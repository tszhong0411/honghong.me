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
import { useSession } from 'next-auth/react'

import { useCommentContext } from '@/contexts/comment'
import { useCommentsContext } from '@/contexts/comments'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { api } from '@/trpc/react'

const CommentMenu = () => {
  const { comment } = useCommentContext()
  const { slug } = useCommentsContext()
  const { data } = useSession()
  const utils = api.useUtils()
  const [copy] = useCopyToClipboard()
  const t = useTranslations('blog.comments')

  const deleteCommentMutation = api.comments.delete.useMutation({
    onSuccess: () => toast.success(t('deleted-a-comment')),
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

  const isAuthor = !isDeleted && data?.user.id === userId

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-8'
            aria-label={t('open-menu')}
            type='button'
          >
            <MoreVerticalIcon className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() =>
              void copy({
                text: `${globalThis.location.origin}/blog/${slug}?${commentQuery}`,
                successMessage: t('link-copied')
              })
            }
          >
            {t('copy-link')}
          </DropdownMenuItem>
          <AlertDialogTrigger asChild>
            {isAuthor ? (
              <DropdownMenuItem
                className='text-red-600 focus:text-red-500'
                disabled={deleteCommentMutation.isPending}
                aria-disabled={deleteCommentMutation.isPending}
              >
                {t('delete')}
              </DropdownMenuItem>
            ) : null}
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('delete-a-comment')}</AlertDialogTitle>
          <AlertDialogDescription>{t('confirm-delete-comment')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteCommentMutation.mutate({ id })
            }}
            className={buttonVariants({ variant: 'destructive' })}
          >
            {t('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CommentMenu
