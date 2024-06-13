'use client'

import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@tszhong0411/ui'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { type MessageContext, MessageProvider } from '@/contexts/message'
import { useFormattedDate } from '@/hooks/use-formatted-date'
import { api } from '@/trpc/react'
import type { GuestbookOutput } from '@/trpc/routers/guestbook'

import Loader from './loader'
import Menu from './menu'

type UpdatedDateProps = {
  date: Date
}

type MessageProps = {
  message: GuestbookOutput[number]
}

const UpdatedDate = (props: UpdatedDateProps) => {
  const { date } = props
  const formattedDate = useFormattedDate(date, {
    format: 'YYYY-MM-DD HH:mm'
  })

  if (!formattedDate) return <Skeleton className='h-4 w-24 rounded-md' />

  return <div className='text-muted-foreground text-xs'>{formattedDate}</div>
}

const Messages = () => {
  const guestbookQuery = api.guestbook.get.useQuery()

  return (
    <div className='mt-10 flex flex-col gap-4'>
      {guestbookQuery.isLoading ? (
        <Loader />
      ) : (
        guestbookQuery.data?.map((message) => <Message key={message.id} message={message} />)
      )}
    </div>
  )
}

const Message = (props: MessageProps) => {
  const { message } = props
  const { data } = useSession()

  const {
    message: {
      id,
      user: { name, image, id: userId },
      updatedAt,
      body
    }
  } = props

  const context = useMemo<MessageContext>(
    () => ({
      message
    }),
    [message]
  )

  return (
    <MessageProvider value={context}>
      <div key={id} className='rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30'>
        <div className='mb-3 flex gap-3'>
          <Avatar>
            <AvatarImage
              src={image}
              width={40}
              height={40}
              className='size-10 rounded-full'
              alt={name}
            />
            <AvatarFallback className='bg-transparent'>
              <Skeleton className='size-10 rounded-full' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-center gap-px text-sm'>
            <div>{name}</div>
            <UpdatedDate date={updatedAt} />
          </div>
        </div>
        <div className='break-words pl-[52px]'>{body}</div>
        {data?.user && userId === data.user.id ? <Menu /> : null}
      </div>
    </MessageProvider>
  )
}

export default Messages
