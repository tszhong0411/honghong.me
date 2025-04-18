'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { useRouter } from '@tszhong0411/i18n/routing'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
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
      onError: (error) => toast.error(error.message)
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
      <Avatar>
        <AvatarImage src={user.image ?? defaultImage} alt={user.name} className='size-10' />
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
