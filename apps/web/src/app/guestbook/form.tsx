'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Skeleton,
  Textarea,
  toast
} from '@tszhong0411/ui'
import { signOut } from 'next-auth/react'
import { useRef } from 'react'

import type { User } from '@/lib/auth'
import { api } from '@/trpc/react'

type FormProps = {
  user: User
}

const Form = (props: FormProps) => {
  const { user } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const utils = api.useUtils()
  const guestbookMutation = api.guestbook.create.useMutation({
    onSuccess: () => {
      textareaRef.current!.value = ''
      toast.success('Create message successfully')
    },
    onSettled: () => utils.guestbook.get.invalidate(),
    onError: (error) => toast.error(error.message)
  })

  const createMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const message = textareaRef.current?.value

    if (!message) {
      toast.error('Message cannot be empty')

      return
    }

    guestbookMutation.mutate({
      message
    })
  }

  return (
    <form onSubmit={createMessageHandler}>
      <div className='mb-2 flex gap-3'>
        <Avatar>
          <AvatarImage
            src={user.image}
            width={40}
            height={40}
            alt={user.name}
            className='size-10'
          />
          <AvatarFallback className='bg-transparent'>
            <Skeleton className='size-10 rounded-full' />
          </AvatarFallback>
        </Avatar>
        <Textarea
          aria-label='Leave message'
          placeholder='Leave message'
          name='message'
          ref={textareaRef}
          required
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button
          variant='outline'
          onClick={() => {
            void signOut()
          }}
          type='button'
        >
          Logout
        </Button>
        <Button
          type='submit'
          disabled={guestbookMutation.isPending}
          aria-disabled={guestbookMutation.isPending}
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

export default Form
