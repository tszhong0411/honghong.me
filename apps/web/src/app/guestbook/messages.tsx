'use client'

import { type Guestbook } from '@prisma/client'
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
  Skeleton
} from '@tszhong0411/ui'
import { dayjs } from '@tszhong0411/utils'
import { type User } from 'next-auth'
import React from 'react'
import { toast } from 'sonner'

import { deleteMessage } from '@/actions/guestbook'

type MessagesProps = {
  user: User | null
  messages: Guestbook[]
}

type UpdatedDateProps = {
  date: Date
}

const UpdatedDate = (props: UpdatedDateProps) => {
  const { date } = props
  const [formattedDate, setFormattedDate] = React.useState('')

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format('YYYY-MM-DD HH:mm'))
  }, [date])

  if (!formattedDate) return <Skeleton className='h-4 w-24 rounded-md' />

  return <div className='text-xs text-muted-foreground'>{formattedDate}</div>
}

const Messages = (props: MessagesProps) => {
  const { user, messages } = props
  const [isDeleting, setIsDeleting] = React.useState(false)

  const deleteMessageHandler = async (id: number) => {
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
        const { id, email, image, created_by, updated_at, body } = message

        return (
          <div key={id} className='rounded-lg border bg-accent p-4'>
            <div className='mb-3 flex gap-3'>
              <Avatar>
                <AvatarImage
                  src={image}
                  width={40}
                  height={40}
                  className='size-10 rounded-full'
                  alt={created_by}
                />
                <AvatarFallback className='bg-transparent'>
                  <Skeleton className='size-10 rounded-full' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-center gap-px text-sm'>
                <div>{created_by}</div>
                <UpdatedDate date={updated_at} />
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
                        onClick={() => deleteMessageHandler(Number(id))}
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
