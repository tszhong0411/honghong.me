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
import { api } from '@/trpc/react'

const DeleteButton = () => {
  const { message } = useMessageContext()
  const utils = api.useUtils()
  const t = useTranslations()

  const guestbookMutation = api.guestbook.delete.useMutation({
    onSuccess: () => toast.success(t('guestbook.delete-message-successfully')),
    onSettled: () => utils.guestbook.invalidate(),
    onError: (error) => toast.error(error.message)
  })

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
          >
            {t('common.delete')}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('guestbook.delete-dialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('guestbook.delete-dialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteMessage(message.id)
              }}
              className={buttonVariants({ variant: 'destructive' })}
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
