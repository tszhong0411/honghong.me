import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconAlertCircle, IconCircleCheck } from '@tabler/icons'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useSWR, { useSWRConfig } from 'swr'

import fetcher from '@/lib/fetcher'
import formatDate from '@/lib/formatDate'

import { useStyles } from './Guestbook.styles'

type entryProps = {
  body: string
  created_by: string
  id: number
  updated_at: string
}

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const modals = useModals()

  const deleteEntry = async () => {
    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    })

    mutate('/api/guestbook')

    showNotification({
      message: t('delete_successful'),
      icon: <IconCircleCheck />,
      color: 'green',
    })
  }

  const deleteHandler = () => {
    modals.openConfirmModal({
      title: t('Guestbook.deleteModalTitle'),
      centered: true,
      labels: { confirm: t('delete'), cancel: t('cancel') },
      sx: {
        '& button': {
          fontWeight: 500,
        },
      },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteEntry(),
    })
  }

  return (
    <Paper
      withBorder
      radius='md'
      sx={(theme) => ({
        padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
      })}
    >
      <Group position='apart'>
        <Group>
          <Avatar src={entry.image} alt={entry.created_by} radius='xl' />
          <div>
            <Text size='sm'>{entry.created_by}</Text>
            <Text size='xs' color='dimmed'>
              {formatDate(new Date(entry.updated_at), locale)}
            </Text>
          </div>
        </Group>
        {user && entry.created_by === user.name && (
          <Button
            variant='outline'
            onClick={deleteHandler}
            sx={{
              height: 26,
              cursor: 'pointer',
            }}
          >
            {t('delete')}
          </Button>
        )}
      </Group>
      <Box
        sx={(theme) => ({
          paddingLeft: 54,
          paddingTop: theme.spacing.sm,
          fontSize: theme.fontSizes.sm,
        })}
      >
        {entry.body}
      </Box>
    </Paper>
  )

  // return (
  //   <Stack spacing='xs' my={24}>
  //     <Text sx={{ wordBreak: 'break-all' }}>{entry.body}</Text>
  //     <Group>
  //       <Badge
  //         variant='gradient'
  //         gradient={{ from: 'orange', to: 'red' }}
  //         size='lg'
  //         sx={{
  //           fontWeight: 500,
  //         }}
  //       >
  //         {entry.created_by +
  //           ' / ' +
  //           formatDate(new Date(entry.updated_at), locale)}
  //       </Badge>
  //       {user && entry.created_by === user.name && (
  //         <Badge
  //           component='button'
  //           variant='light'
  //           onClick={deleteHandler}
  //           sx={{
  //             fontWeight: 500,
  //             height: 26,
  //             cursor: 'pointer',
  //           }}
  //         >
  //           {t('delete')}
  //         </Badge>
  //       )}
  //     </Group>
  //   </Stack>
  // )
}

export default function Guestbook({ fallbackData, session }) {
  const [loading, setLoading] = React.useState<boolean>(false)
  const { mutate } = useSWRConfig()
  const { data: entries } = useSWR('/api/guestbook', fetcher, {
    fallbackData,
  })
  const { t } = useTranslation('common')
  const { classes } = useStyles()
  const router = useRouter()

  const form = useForm({
    initialValues: {
      content: '',
    },

    validate: {
      content: (value) => (value ? null : t('Guestbook.error')),
    },
  })

  type FormValues = typeof form.values

  const leaveEntry = async (values: FormValues) => {
    setLoading(true)

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        body: values.content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()

    if (error) {
      showNotification({
        message: error,
        icon: <IconAlertCircle />,
      })
      return
    }

    mutate('/api/guestbook')

    showNotification({
      message: t('Guestbook.success'),
      icon: <IconCircleCheck />,
      color: 'green',
    })

    setLoading(false)
  }

  return (
    <>
      <Paper withBorder shadow='md' p={30} radius='md'>
        <Text
          sx={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          {session?.user
            ? t('Guestbook.guestbook')
            : t('Guestbook.signInGuestbook')}
        </Text>
        {session?.user && (
          <form onSubmit={form.onSubmit(leaveEntry)}>
            <Group className={classes.formWrapper} position='apart'>
              <TextInput
                label={t('Guestbook.message')}
                placeholder={t('Guestbook.placeholder')}
                required
                classNames={classes}
                mt='md'
                sx={(theme) => ({
                  maxWidth: '100%',
                  width: '100%',
                  [theme.fn.largerThan('sm')]: {
                    maxWidth: '70%',
                  },
                })}
                {...form.getInputProps('content')}
              />
              <Button mt={16} type='submit' className={classes.btn}>
                {t('Guestbook.sign')}
              </Button>
            </Group>
          </form>
        )}
        {!session && (
          <Button
            fullWidth
            mt='xl'
            onClick={() =>
              router.push(
                `/auth/signin?callbackUrl=${encodeURIComponent(
                  window.location.href
                )}`
              )
            }
          >
            {t('Guestbook.signIn')}
          </Button>
        )}
        <Text size='sm' my={16}>
          {t('Guestbook.tip')}
        </Text>
        {session?.user && (
          <>
            <Divider />
            <Group my={36} position='apart'>
              <Group>
                <Image
                  src={session.user.image}
                  width={48}
                  height={48}
                  alt='User avatar'
                  className={classes.avatar}
                />
                <span>{session.user.name}</span>
              </Group>
              <Button onClick={() => signOut()} className={classes.btn}>
                {t('Guestbook.signOut')}
              </Button>
            </Group>
          </>
        )}
      </Paper>
      <div>
        {loading && (
          <Stack spacing='md' my={30}>
            <Skeleton height={15} width='25%' radius='xl' />
            <Skeleton height={15} width='30%' radius='xl' />
          </Stack>
        )}
        <Stack my={40}>
          {entries?.map((entry: entryProps) => (
            <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
          ))}
        </Stack>
      </div>
    </>
  )
}
