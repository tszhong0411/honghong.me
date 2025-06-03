'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { useRouter } from '@tszhong0411/i18n/routing'
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
  Textarea,
  toast
} from '@tszhong0411/ui'
import { getAbbreviation } from '@tszhong0411/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signOut, type User } from '@/lib/auth-client'
import { useTRPC } from '@/trpc/client'
import { getDefaultImage } from '@/utils/get-default-image'

type FormProps = {
  user: User
}

const MessageBox = (props: FormProps) => {
  const { user } = props
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const t = useTranslations()
  const router = useRouter()

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

  const guestbookMutation = useMutation(
    trpc.guestbook.create.mutationOptions({
      onSuccess: () => {
        form.reset()
        toast.success(t('guestbook.create-message-successfully'))
      },
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: trpc.guestbook.getInfiniteMessages.infiniteQueryKey()
        }),
      onError: (error) => {
        toast.error(error.message)
      }
    })
  )

  const onSubmit = (values: z.infer<typeof guestbookFormSchema>) => {
    guestbookMutation.mutate({
      message: values.message
    })
  }

  const defaultImage = getDefaultImage(user.id)

  return (
    <div className='flex gap-3'>
      <Avatar className='size-10'>
        <AvatarImage src={user.image ?? defaultImage} alt={user.name} />
        <AvatarFallback>{getAbbreviation(user.name)}</AvatarFallback>
      </Avatar>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={t('guestbook.placeholder')}
                    data-testid='guestbook-textarea'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='mt-4 flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.refresh()
                    }
                  }
                })
              }}
            >
              {t('common.sign-out')}
            </Button>
            <Button
              type='submit'
              disabled={guestbookMutation.isPending}
              aria-disabled={guestbookMutation.isPending}
              data-testid='guestbook-submit-button'
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
