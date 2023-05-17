'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Textarea,
} from '@tszhong0411/ui'
import { DefaultSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useSWRConfig } from 'swr'

type FormProps = {
  user: DefaultSession['user']
}

const Form = (props: FormProps) => {
  const { user } = props
  const [value, setValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { mutate } = useSWRConfig()

  const submitHandler = async () => {
    if (!value) return toast.error('Please enter a message')

    setIsLoading(true)
    const loading = toast.loading('Submitting message...')

    const res = await fetch('/api/guestbook', {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const { error } = await res.json()
      setIsLoading(false)
      toast.dismiss(loading)
      toast.error(error)

      return
    }

    setIsLoading(false)
    toast.dismiss(loading)
    toast.success('Message submitted successfully')
    setValue('')

    return mutate('/api/guestbook')
  }

  return (
    <>
      <div className='mb-2 flex gap-3'>
        <Avatar>
          <AvatarImage
            src={user?.image as string}
            width={40}
            height={40}
            alt={user?.name as string}
            className='h-10 w-10'
          />
          <AvatarFallback>TH</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder='Your message ...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={() => signOut()} type='button'>
          Logout
        </Button>
        <Button onClick={submitHandler} type='button' disabled={isLoading}>
          Submit
        </Button>
      </div>
    </>
  )
}

export default Form
