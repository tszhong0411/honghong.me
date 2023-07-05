'use client'

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
  Skeleton,
} from '@tszhong0411/ui'
import dayjs from 'dayjs'
import { DefaultSession } from 'next-auth'
import React from 'react'
import { toast } from 'react-hot-toast'

import { deleteMessage } from './actions'

import { Messages } from '@/types'

type MessagesProps = {
  user: DefaultSession['user']
  messages: Messages
}

type DateProps = {
  date: Date
}

const Date = (props: DateProps) => {
  const { date } = props
  const [formattedDate, setFormattedDate] = React.useState('')

  React.useEffect(() => {
    setFormattedDate(dayjs(date).format('YYYY-MM-DD HH:mm'))
  }, [date])

  if (!formattedDate) return <Skeleton className='h-4 w-24 rounded-md' />

  return <div className='text-xs text-accent-5'>{formattedDate}</div>
}

const Messages = (props: MessagesProps) => {
  const { user, messages } = props

  const [isDeleting, setIsDeleting] = React.useState(false)

  const deleteMessageHandler = async (id: number) => {
    setIsDeleting(true)
    const loading = toast.loading('Deleting a message ...')

    try {
      await deleteMessage(id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsDeleting(false)
      toast.dismiss(loading)
      toast.error(error.message)
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
          <div key={id} className='rounded-lg border border-accent-2 p-4'>
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
                <Date date={updated_at} />
              </div>
            </div>
            <div className='break-words pl-[52px]'>{body}</div>
            {user && created_by === user.name && (
              <div className='mt-4 flex justify-end'>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      disabled={isDeleting}
                      variant='danger'
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
                        onClick={() => deleteMessageHandler(id)}
                        className={buttonVariants({ variant: 'danger' })}
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
