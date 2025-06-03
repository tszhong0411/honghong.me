import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  toast
} from '@tszhong0411/ui'

import { useMessageContext } from '@/contexts/message'
import { useTRPC } from '@/trpc/client'

const DeleteButton = () => {
  const { message } = useMessageContext()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const t = useTranslations()

  const guestbookMutation = useMutation(
    trpc.guestbook.delete.mutationOptions({
      onSuccess: () => {
        toast.success(t('guestbook.delete-message-successfully'))
      },
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: trpc.guestbook.getInfiniteMessages.infiniteQueryKey()
        }),
      onError: (error) => {
        toast.error(error.message)
      }
    })
  )

  const handleDeleteMessage = (id: string) => {
    guestbookMutation.mutate({ id })
  }

  return (
    <div className='mt-4 flex justify-end'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            disabled={guestbookMutation.isPending}
            aria-disabled={guestbookMutation.isPending}
            data-testid='guestbook-delete-button'
          >
            {t('common.delete')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent data-testid='guestbook-dialog'>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('guestbook.delete-dialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('guestbook.delete-dialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteMessage(message.id)}
              className={buttonVariants({ variant: 'destructive' })}
              data-testid='guestbook-dialog-delete-button'
            >
              {t('common.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteButton
