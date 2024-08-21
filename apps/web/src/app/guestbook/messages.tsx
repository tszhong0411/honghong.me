'use client'

import { keepPreviousData } from '@tanstack/react-query'
import { Avatar, AvatarFallback, AvatarImage, Skeleton } from '@tszhong0411/ui'
import { useSession } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

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
  message: GuestbookOutput['messages'][number]
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
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.guestbook.getInfiniteMessages.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        placeholderData: keepPreviousData
      }
    )

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage, inView])

  return (
    <div className='mt-10 flex flex-col gap-4' data-testid='guestbook-messages-list'>
      {status === 'success'
        ? data.pages.map((page) =>
            page.messages.map((message) => <Message key={message.id} message={message} />)
          )
        : null}
      {status === 'success' && data.pages[0]?.messages.length === 0 ? (
        <div className='flex min-h-24 items-center justify-center'>
          <p className='text-muted-foreground text-sm'>
            No messages. Be the first to leave a message!
          </p>
        </div>
      ) : null}
      {status === 'error' ? (
        <div className='flex min-h-24 items-center justify-center'>
          <p className='text-muted-foreground text-sm'>
            Failed to load messages. Please refresh the page.
          </p>
        </div>
      ) : null}
      {status === 'pending' || isFetchingNextPage ? <Loader /> : null}
      <span ref={ref} className='invisible' />
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
      <div className='rounded-lg border p-4 shadow-sm dark:bg-zinc-900/30' id={`message-${id}`}>
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
