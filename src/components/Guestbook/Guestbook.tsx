import {
  Badge,
  Button,
  Divider,
  Group,
  Paper,
  Skeleton,
  Text,
  TextInput,
} from '@mantine/core'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useSWR, { useSWRConfig } from 'swr'
import { AlertCircle, CircleCheck } from 'tabler-icons-react'

import fetcher from '@/lib/fetcher'
import formatDate from '@/lib/utils/formatDate'

import { entryProps } from '@/components/Guestbook/types'

import useStyles from './Guestbook.styles'

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const modals = useModals()

  const deleteEntry = async () => {
    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    })

    mutate('/api/guestbook')

    showNotification({
      message: t('common:delete_successful'),
      icon: <CircleCheck />,
      color: 'green',
    })
  }

  const deleteHandler = () => {
    modals.openConfirmModal({
      title: t('common:Guestbook_deleteModal_title'),
      centered: true,
      labels: { confirm: t('common:delete'), cancel: t('common:cancel') },
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
    <Group direction='column' spacing='xs' my={24}>
      <Text sx={{ wordBreak: 'break-all' }}>{entry.body}</Text>
      <Group>
        <Badge
          variant='gradient'
          gradient={{ from: 'orange', to: 'red' }}
          size='lg'
          sx={{
            fontWeight: 500,
          }}
        >
          {entry.created_by}
          {' / '}
          {formatDate(new Date(entry.updated_at), locale)}
        </Badge>
        {user && entry.created_by === user.name && (
          <Badge
            component='button'
            variant='light'
            onClick={deleteHandler}
            sx={{
              fontWeight: 500,
              height: 26,
              cursor: 'pointer',
            }}
          >
            {t('common:delete')}
          </Badge>
        )}
      </Group>
    </Group>
  )
}

export default function Guestbook({ fallbackData, session }) {
  const [focused, setFocused] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(false)
  const inputEl = React.useRef(null)
  const { mutate } = useSWRConfig()
  const { data: entries } = useSWR('/api/guestbook', fetcher, {
    fallbackData,
  })
  const { t } = useTranslation()
  const { classes } = useStyles({
    floating: value.trim().length !== 0 || focused,
  })
  const router = useRouter()

  const leaveEntry = async (e: React.FormEvent) => {
    e.preventDefault()

    if (inputEl.current.value !== '') {
      const res = await fetch('/api/guestbook', {
        body: JSON.stringify({
          body: inputEl.current.value,
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
          icon: <AlertCircle />,
        })
        return
      }

      mutate('/api/guestbook')

      showNotification({
        message: t('common:Guestbook_success'),
        icon: <CircleCheck />,
        color: 'green',
      })

      setLoading(false)
    } else {
      showNotification({
        message: t('common:Guestbook_error'),
        icon: <AlertCircle />,
      })
    }
  }

  return (
    <>
      <Paper
        withBorder
        shadow='md'
        p={30}
        mt={30}
        radius='md'
        sx={{
          maxWidth: 560,
        }}
      >
        <Text
          sx={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          {session?.user
            ? t('common:Guestbook_guestbook')
            : t('common:Guestbook_signInGuestbook')}
        </Text>
        {session?.user && (
          <form onSubmit={leaveEntry}>
            <Group grow className={classes.formWrapper} position='apart'>
              <TextInput
                label={t('common:Guestbook_message')}
                placeholder={t('common:Guestbook_placeholder')}
                required
                classNames={classes}
                value={value}
                ref={inputEl}
                onChange={(event) => setValue(event.currentTarget.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                mt='md'
                sx={(theme) => ({
                  maxWidth: '100%',
                  width: '100%',
                  [theme.fn.largerThan('sm')]: {
                    maxWidth: '70%',
                  },
                })}
                autoComplete='nope'
              />
              <Button mt={16} type='submit' className={classes.btn}>
                {t('common:Guestbook_sign')}
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
            {t('common:Guestbook_signIn')}
          </Button>
        )}
        <Text size='sm' my={16}>
          {t('common:Guestbook_tip')}
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
                {t('common:Guestbook_signOut')}
              </Button>
            </Group>
          </>
        )}
      </Paper>
      <div>
        {loading && (
          <Group spacing='md' my={30} direction='column'>
            <Skeleton height={15} width='25%' radius='xl' />
            <Skeleton height={15} width='30%' radius='xl' />
          </Group>
        )}
        {entries?.map((entry: entryProps) => (
          <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
    </>
  )
}
