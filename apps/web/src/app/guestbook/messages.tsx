'use client'

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
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  Skeleton,
  toast
} from '@tszhong0411/ui'
import { type User } from 'next-auth'
import * as React from 'react'

import { deleteMessage } from '@/actions/guestbook'
import type { guestbook } from '@/db/schema'
import { useFormattedDate } from '@/hooks/use-formatted-date'

type MessagesProps = {
  user: User | null
  messages: Array<typeof guestbook.$inferSelect>
}

type UpdatedDateProps = {
  date: Date
}

const UpdatedDate = (props: UpdatedDateProps) => {
  const { date } = props
  const formattedDate = useFormattedDate(date, {
    format: 'YYYY-MM-DD HH:mm'
  })

  if (!formattedDate) return <Skeleton className='h-4 w-24 rounded-md' />

  return <div className='text-xs text-muted-foreground'>{formattedDate}</div>
}

const Messages = (props: MessagesProps) => {
  const { user, messages } = props
  const [isDeleting, setIsDeleting] = React.useState(false)

  const deleteMessageHandler = async (id: string) => {
    const toastId = toast.loading('Deleting a message...')

    setIsDeleting(true)

    const result = await deleteMessage(id)

    toast.dismiss(toastId)

    if (result.error) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
    }

    setIsDeleting(false)
  }

  return (
    <div className='mt-10 flex flex-col gap-4'>
      {messages.map((message) => {
        const { id, email, image, createdBy, updatedAt, body } = message

        return (
          <div
            key={id}
            className='rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30'
          >
            <div className='mb-3 flex gap-3'>
              <Avatar>
                <AvatarImage
                  src={image as string}
                  width={40}
                  height={40}
                  className='size-10 rounded-full'
                  alt={createdBy}
                />
                <AvatarFallback className='bg-transparent'>
                  <Skeleton className='size-10 rounded-full' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-center gap-px text-sm'>
                <div>{createdBy}</div>
                <UpdatedDate date={updatedAt} />
              </div>
            </div>
            <div className='break-words pl-[52px]'>{body}</div>
            {user && email === user.email && (
              <div className='mt-4 flex justify-end'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='destructive'
                      type='button'
                      disabled={isDeleting}
                      aria-disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete a comment</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this comment? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteMessageHandler(id)}
                        className={buttonVariants({ variant: 'destructive' })}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Messages
