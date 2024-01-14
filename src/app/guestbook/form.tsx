'use client'

import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { toast } from 'react-hot-toast'

import { createMessage } from '@/actions/guestbook'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
  Textarea
} from '@/components/ui'

type FormProps = {
  user: User
}

const Form = (props: FormProps) => {
  const { user } = props
  const [message, setMessage] = React.useState('')
  const [isCreating, setIsCreating] = React.useState(false)

  const createMessageHandler = async () => {
    if (!message) return toast.error('Please enter a message.')

    setIsCreating(true)
    const loading = toast.loading('Creating a message...')

    try {
      await createMessage(message)
    } catch (error) {
      setIsCreating(false)
      toast.dismiss(loading)
      toast.error((error as Error).message)
    }

    setIsCreating(false)
    toast.dismiss(loading)
    toast.success('Created a message.')

    return setMessage('')
  }

  return (
    <>
      <div className='mb-2 flex gap-3'>
        <Avatar>
          <AvatarImage
            src={user.image as string}
            width={40}
            height={40}
            alt={user.name as string}
            className='size-10'
          />
          <AvatarFallback className='bg-transparent'>
            <Skeleton className='size-10 rounded-full' />
          </AvatarFallback>
        </Avatar>
        <Textarea
          aria-label='Your message'
          placeholder='Your message ...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={() => signOut()} type='button'>
          Logout
        </Button>
        <Button
          onClick={createMessageHandler}
          type='button'
          disabled={isCreating || message.length === 0}
        >
          Submit
        </Button>
      </div>
    </>
  )
}

export default Form
