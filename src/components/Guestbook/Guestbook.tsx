'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { User } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import TextareaAutosize from 'react-textarea-autosize'

import Loader from './Loader'
import Image from '../MDXComponents/Image'
import Modal from '../Modal'

type GuestbookProps = {
  user: Omit<User, 'id'>
  messages: {
    id: string
    body: string
    image: string
    created_by: string
    updated_at: string
  }[]
}

const submitMessage = async (
  content: string,
  refresh: () => void,
  onSuccess?: () => void,
  onDone?: () => void
) => {
  const loading = toast.loading('Signing')

  const res = await fetch('/api/guestbook', {
    body: JSON.stringify({
      body: content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!res.ok) {
    toast.dismiss(loading)
    toast.error(await res.text())
    typeof onDone === 'function' && onDone()

    return
  }

  refresh()
  typeof onSuccess === 'function' && onSuccess()
  typeof onDone === 'function' && onDone()

  toast.dismiss(loading)
  toast.success('Added successfully')
}

const deleteMessage = async (id: string, refresh: () => void) => {
  const loading = toast.loading('Deleting')

  const res = await fetch(`/api/guestbook/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    toast.dismiss(loading)
    toast.error(await res.text())

    return
  }

  refresh()

  toast.dismiss(loading)
  toast.success('Deleted successfully')
}

const Guestbook = (props: GuestbookProps) => {
  const { user, messages } = props
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { refresh } = useRouter()

  return (
    <div className='mx-auto max-w-lg'>
      {!user && (
        <>
          <button
            className='rounded-lg bg-theme-9 px-4 py-2 text-white transition-colors duration-300 hover:bg-theme-10'
            onClick={() => signIn()}
          >
            Login
          </button>
          <span className='ml-2'>to continue leaving a message</span>
        </>
      )}
      {user && (
        <>
          <div className='mb-2 flex'>
            <Image
              src={user?.image}
              width={40}
              height={40}
              alt={user?.name}
              className='h-10 w-10'
              rounded='rounded-full'
            />
            <TextareaAutosize
              className='ml-3 flex-1 rounded-md border border-accent-2 bg-hong-bg py-2 px-3 transition-colors duration-200 ease-linear focus:border-accent-5 focus:outline-none'
              placeholder='Your message ...'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className='flex justify-end gap-2'>
            <button
              className='rounded-lg border border-theme-7 bg-theme-1 px-4 py-2 text-theme-11 transition-colors duration-300 hover:border-theme-8'
              onClick={() => signOut()}
            >
              Logout
            </button>
            <button
              className='rounded-lg bg-theme-9 px-4 py-2 text-white transition-colors duration-300 hover:bg-theme-10'
              onClick={() => {
                setLoading(true)
                submitMessage(
                  value,
                  refresh,
                  () => setValue(''),
                  () => setLoading(false)
                )
              }}
              disabled={loading}
            >
              Sign
            </button>
          </div>
        </>
      )}
      <div className='mt-10 flex flex-col gap-4'>
        {loading && <Loader />}
        {messages.map((message) => (
          <div
            key={message.id}
            className='rounded-lg border border-accent-2 p-4'
          >
            <div className='mb-3 flex gap-3'>
              <Image
                src={message.image}
                width={40}
                height={40}
                alt={message.created_by}
                className='h-10 w-10'
                rounded='rounded-full'
              />
              <div className='flex flex-col justify-center gap-px text-sm'>
                <div>{message.created_by}</div>
                <div className='text-xs text-accent-5'>
                  {dayjs(message.updated_at).format('MMMM DD, YYYY')}
                </div>
              </div>
            </div>
            <div className='break-words pl-[52px]'>{message.body}</div>
            {user && message.created_by === user.name && (
              <div className='mt-4 flex justify-end'>
                <Modal>
                  <Modal.Trigger>
                    <button className='rounded-lg bg-theme-9 px-4 py-2 text-white transition-colors duration-300 hover:bg-theme-10'>
                      Delete
                    </button>
                  </Modal.Trigger>
                  <Modal.Content>
                    <div className='mb-2'>Delete a comment</div>
                    <div className='flex justify-end gap-2'>
                      <Modal.Close>
                        <button className='rounded-lg border border-theme-7 bg-theme-1 px-4 py-2 text-theme-11 transition-colors duration-300 hover:border-theme-8'>
                          Cancel
                        </button>
                      </Modal.Close>
                      <Modal.Close>
                        <button
                          className='rounded-lg bg-theme-9 px-4 py-2 text-white transition-colors duration-300 hover:bg-theme-10'
                          onClick={() => deleteMessage(message.id, refresh)}
                        >
                          Delete
                        </button>
                      </Modal.Close>
                    </div>
                  </Modal.Content>
                </Modal>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Guestbook
