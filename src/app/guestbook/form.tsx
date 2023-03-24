'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import React from 'react'
import { toast } from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'

import Image from '@/components/MDXComponents/Image'

type FormProps = {
  user: DefaultSession['user']
}

const Form = (props: FormProps) => {
  const { user } = props
  const [value, setValue] = React.useState('')
  const queryClient = useQueryClient()

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: async (message: string) => {
      const loading = toast.loading('留言中...')

      const res = await fetch('/api/guestbook', {
        method: 'POST',
        body: JSON.stringify({
          message,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const { error } = await res.json()
        toast.dismiss(loading)
        toast.error(error)

        return
      }

      toast.dismiss(loading)
      toast.success('留言成功')
      setValue('')
      queryClient.invalidateQueries({ queryKey: ['guestbook', 'messages'] })
    },
  })

  const submitHandler = async () => {
    if (!value) return toast.error('請輸入留言')
    mutate(value)
  }

  return (
    <>
      <div className='mb-2 flex'>
        <Image
          src={user?.image as string}
          width={40}
          height={40}
          alt={user?.name as string}
          className='h-10 w-10'
          rounded='rounded-full'
        />
        <TextareaAutosize
          className='ml-3 flex-1 rounded-md border border-accent-2 bg-hong-bg py-2 px-3 transition-colors duration-200 ease-linear focus:border-accent-5 focus:outline-none'
          placeholder='你的留言 ...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className='flex justify-end gap-2'>
        <button
          className='rounded-lg border border-theme-7 bg-theme-1 px-4 py-2 text-theme-11 transition-colors duration-300 hover:border-theme-8'
          onClick={() => signOut()}
        >
          登出
        </button>
        <button
          className='rounded-lg bg-theme-9 px-4 py-2 text-white transition-colors duration-300 hover:bg-theme-10'
          onClick={submitHandler}
          disabled={isLoading || isError}
        >
          留言
        </button>
      </div>
    </>
  )
}

export default Form
