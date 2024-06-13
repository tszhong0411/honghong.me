'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  buttonVariants,
  Skeleton,
  toast
} from '@tszhong0411/ui'
import { useSession } from 'next-auth/react'

import { useFormattedDate } from '@/hooks/use-formatted-date'
import { api } from '@/trpc/react'

import Loader from './loader'

type UpdatedDateProps = {
  date: Date
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
  const { data } = useSession()
  const utils = api.useUtils()
  const guestbookQuery = api.guestbook.get.useQuery()
  const guestbookMutation = api.guestbook.delete.useMutation({
    onSettled: () => utils.guestbook.get.invalidate(),
    onError: (error) => toast.error(error.message)
  })

  const deleteMessageHandler = (id: string) => {
    guestbookMutation.mutate({ id })
  }

  return (
    <div className='mt-10 flex flex-col gap-4'>
      {guestbookQuery.isLoading ? (
        <Loader />
      ) : (
        guestbookQuery.data?.map((message) => {
          const {
            id,
            user: { name, image, id: userId },
            updatedAt,
            body
          } = message

          return (
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
              {data?.user && userId === data.user.id ? (
                <div className='mt-4 flex justify-end'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant='destructive'
                        type='button'
                        disabled={guestbookMutation.isPending}
                        aria-disabled={guestbookMutation.isPending}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete a comment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this comment? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            deleteMessageHandler(id)
                          }}
                          className={buttonVariants({ variant: 'destructive' })}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : null}
            </div>
          )
        })
      )}
    </div>
  )
}

export default Messages
