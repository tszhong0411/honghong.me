'use client'

import dayjs from 'dayjs'
import { type DefaultSession } from 'next-auth'
import React from 'react'
import { toast } from 'react-hot-toast'

import { deleteMessage } from '@/actions/guestbook'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  Skeleton
} from '@/components/ui'
import { type Message } from '@/types'

type MessagesProps = {
  user: DefaultSession['user']
  messages: Message[]
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
    setIsDeleting(true)
    const loading = toast.loading('Deleting a message ...')

    try {
      await deleteMessage(id)
    } catch (error) {
      setIsDeleting(false)
      toast.dismiss(loading)
      toast.error((error as Error).message)
    }

    setIsDeleting(false)
    toast.dismiss(loading)
    toast.success('Deleted successfully')
  }

  return (
    <div className='mt-10 flex flex-col gap-4'>
      {messages.map((message) => {
        const { id, image, created_by, updated_at, body } = message

        return (
          <div key={id} className='rounded-lg border p-4'>
            <div className='mb-3 flex gap-3'>
              <Avatar>
                <AvatarImage
                  src={image}
                  width={40}
                  height={40}
                  className='h-10 w-10 rounded-full'
                  alt={created_by}
                />
                <AvatarFallback className='bg-transparent'>
                  <Skeleton className='h-10 w-10 rounded-full' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-center gap-px text-sm'>
                <div>{created_by}</div>
                <UpdatedDate date={updated_at} />
              </div>
            </div>
            <div className='break-words pl-[52px]'>{body}</div>
            {user && created_by === user.name && (
              <div className='mt-4 flex justify-end'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={isDeleting}
                      variant='destructive'
                      type='button'
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <div className='mb-2'>Delete a message</div>
                    <div className='flex justify-end gap-2'>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          return deleteMessageHandler(id)
                        }}
                        className={buttonVariants({ variant: 'destructive' })}
                      >
                        Delete
                      </AlertDialogAction>
                    </div>
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
