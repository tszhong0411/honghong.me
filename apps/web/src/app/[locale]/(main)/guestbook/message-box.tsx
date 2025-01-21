'use client'

import type { User } from '@/lib/auth'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Skeleton,
  Textarea,
  toast
} from '@tszhong0411/ui'
import { signOut } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/trpc/react'

type FormProps = {
  user: User
}

const MessageBox = (props: FormProps) => {
  const { user } = props
  const utils = api.useUtils()
  const t = useTranslations()

  const guestbookFormSchema = z.object({
    message: z.string().min(1, {
      message: t('guestbook.message-cannot-be-empty')
    })
  })

  const form = useForm<z.infer<typeof guestbookFormSchema>>({
    resolver: zodResolver(guestbookFormSchema),
    defaultValues: {
      message: ''
    }
  })

  const guestbookMutation = api.guestbook.create.useMutation({
    onSuccess: () => {
      form.reset()
      toast.success(t('guestbook.create-message-successfully'))
    },
    onSettled: () => utils.guestbook.invalidate(),
    onError: (error) => toast.error(error.message)
  })

  const onSubmit = (values: z.infer<typeof guestbookFormSchema>) => {
    guestbookMutation.mutate({
      message: values.message
    })
  }

  return (
    <div className='flex gap-3'>
      <Avatar>
        <AvatarImage src={user.image} width={40} height={40} alt={user.name} className='size-10' />
        <AvatarFallback className='bg-transparent'>
          <Skeleton className='size-10 rounded-full' />
        </AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder={t('guestbook.placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-4 flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => {
                void signOut()
              }}
            >
              {t('common.sign-out')}
            </Button>
            <Button
              type='submit'
              disabled={guestbookMutation.isPending}
              aria-disabled={guestbookMutation.isPending}
            >
              {t('guestbook.submit')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default MessageBox
