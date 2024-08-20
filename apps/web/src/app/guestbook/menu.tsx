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

const Menu = () => {
  const { message } = useMessageContext()
  const utils = api.useUtils()

  const guestbookMutation = api.guestbook.delete.useMutation({
    onSuccess: () => toast.success('Delete message successfully'),
    onSettled: () => utils.guestbook.invalidate(),
    onError: (error) => toast.error(error.message)
  })

  const deleteMessageHandler = (id: string) => {
    guestbookMutation.mutate({ id })
  }

  return (
    <div className='mt-4 flex justify-end'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant='destructive'
            type='button'
            disabled={guestbookMutation.isPending}
            aria-disabled={guestbookMutation.isPending}
          >
            Delete
          </Button>
        </AlertDialogTrigger>
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
                deleteMessageHandler(message.id)
              }}
              className={buttonVariants({ variant: 'destructive' })}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Menu
