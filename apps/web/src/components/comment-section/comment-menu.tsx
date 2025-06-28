import { useMutation } from '@tanstack/react-query'
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

import { useCommentParams } from '@/hooks/use-comment-params'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { useSession } from '@/lib/auth-client'
import { useTRPCInvalidator } from '@/lib/trpc-invalidator'
import { useCommentStore } from '@/stores/comment'
import { useCommentsStore } from '@/stores/comments'
import { useTRPC } from '@/trpc/client'

const CommentMenu = () => {
  const comment = useCommentStore((state) => state.comment)
  const { slug, sort } = useCommentsStore((state) => ({ slug: state.slug, sort: state.sort }))
  const [params] = useCommentParams()
  const { data: session } = useSession()
  const trpc = useTRPC()
  const invalidator = useTRPCInvalidator()
  const [copy] = useCopyToClipboard()
  const t = useTranslations()

  const deleteCommentMutation = useMutation(
    trpc.comments.delete.mutationOptions({
      onSuccess: () => {
        toast.success(t('blog.comments.deleted-a-comment'))
      },
      onError: (error) => {
        toast.error(error.message)
      },
      onSettled: async () => {
        // 根據評論類型使用不同的失效策略
        if (comment.parentId) {
          // 如果是回覆：失效主評論列表 + 對應的回覆列表
          const mainCommentsParams = {
            slug,
            sort,
            type: 'comments' as const,
            highlightedCommentId: params.comment ?? undefined
          }

          const repliesParams = {
            slug,
            sort: 'oldest' as const,
            parentId: comment.parentId,
            type: 'replies' as const,
            highlightedCommentId: params.reply ?? undefined
          }

          await Promise.all([
            // 失效主評論列表
            invalidator.comments.invalidateInfiniteComments(mainCommentsParams),
            // 失效對應的回覆列表
            invalidator.comments.invalidateInfiniteComments(repliesParams),
            // 失效統計
            invalidator.comments.invalidateCountsBySlug(slug)
          ])
        } else {
          // 如果是主評論：失效主評論列表
          const mainCommentsParams = {
            slug,
            sort,
            type: 'comments' as const,
            highlightedCommentId: params.comment ?? undefined
          }

          await invalidator.comments.invalidateAfterAction({
            slug,
            infiniteCommentsParams: mainCommentsParams
          })
        }
      }
    })
  )

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
            data-testid='comment-menu-button'
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
            {isAuthor && (
              <DropdownMenuItem
                disabled={deleteCommentMutation.isPending}
                aria-disabled={deleteCommentMutation.isPending}
                data-testid='comment-delete-button'
                variant='destructive'
              >
                {t('common.delete')}
              </DropdownMenuItem>
            )}
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent data-testid='comment-dialog'>
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
            data-testid='comment-dialog-delete-button'
          >
            {t('common.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CommentMenu
