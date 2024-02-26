'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
  Textarea
} from '@tszhong0411/ui'
import { toast } from '@tszhong0411/ui'
import { type User } from 'next-auth'
import { signOut } from 'next-auth/react'
import * as React from 'react'
import { useFormStatus } from 'react-dom'

import { createMessage } from '@/actions/guestbook'

type FormProps = {
  user: User
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} aria-disabled={pending}>
      Submit
    </Button>
  )
}

const Form = (props: FormProps) => {
  const { user } = props
  const formRef = React.useRef<HTMLFormElement>(null)

  const createMessageHandler = async (formData: FormData) => {
    const toastId = toast.loading('Creating a message...')

    const result = await createMessage(formData)

    toast.dismiss(toastId)

    if (result.error) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      formRef.current?.reset()
    }
  }

  return (
    <form action={createMessageHandler} ref={formRef}>
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
          name='message'
          required
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={() => signOut()} type='button'>
          Logout
        </Button>
        <SubmitButton />
      </div>
    </form>
  )
}

export default Form
