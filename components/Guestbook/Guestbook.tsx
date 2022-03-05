import { useRef, useState, useEffect, CSSProperties } from 'react'
import { format } from 'date-fns'
import { signIn, useSession } from 'next-auth/react'
import useSWR, { useSWRConfig } from 'swr'
import { toast } from 'react-toastify'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import fetcher from '@/lib/fetcher'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import Link from '@/components/Link'
import { Flex } from '@/components/Flex'
import { Button } from '../Button'
import Input from '../Input'
import { Avatar } from './Styles'

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig()
  const deleteEntry = async (e) => {
    e.preventDefault()

    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    })

    mutate('/api/guestbook')
  }

  const { t } = useTranslation()

  return (
    <Flex
      direction={'column'}
      css={{
        spaceY: '$2',
      }}
    >
      <Box>{entry.body}</Box>
      <Flex direction={'row'} alignItems={'center'} css={{ spaceX: '$3' }}>
        <Text size={2} as="p" css={{ color: '$honghong-colors-typeface-secondary' }}>
          {entry.created_by}
        </Text>
        <Text as="span" size={1}>
          /
        </Text>
        <Text size={2} as="p" css={{ color: '$honghong-colors-typeface-secondary' }}>
          {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}
        </Text>
        {user && entry.created_by === user.name && (
          <>
            <Text as="span" size={1}>
              /
            </Text>
            <Button
              variant="red"
              css={{
                fontSize: '$sm',
                width: '$8',
                height: '$6',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={deleteEntry}
            >
              {t('guestbook:delete')}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default function Guestbook({ fallbackData }) {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const { mutate } = useSWRConfig()
  const inputEl = useRef(null)
  const { data: entries } = useSWR('/api/guestbook', fetcher, {
    fallbackData,
  })
  const { t } = useTranslation()

  const leaveEntry = async (e) => {
    e.preventDefault()

    if (inputEl.current.value !== '') {
      setLoading(true)
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
        toast.error(error)
        return
      }

      inputEl.current.value = ''
      mutate('/api/guestbook')
      toast.success(t('guestbook:success'))
      setLoading(false)
    } else {
      toast.error(t('guestbook:error'))
    }
  }

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '1rem',
    height: '1rem',
    boxSizing: 'border-box',
    margin: '0 auto',
  }

  const circleStyle: CSSProperties = {
    display: 'block',
    width: '1rem',
    height: '1rem',
    border: '3px solid #e9e9e9',
    borderTop: '3px solid #f90606',
    borderRadius: '50%',
    position: 'absolute',
    boxSizing: 'border-box',
    top: 0,
    left: 0,
  }

  const spinTransition = {
    repeat: Infinity,
    ease: 'linear',
    duration: 1,
  }

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      <Box
        css={{
          my: '$4',
          width: '100%',
          maxWidth: '$max-w-2xl',
          borderRadius: '$1',
          backgroundColor: '$honghong-colors-body-secondary',
          p: '$5',
        }}
      >
        <Text
          size={4}
          as="h5"
          css={{
            fontWeight: 700,
            '@md': {
              fontSize: '$xl',
            },
          }}
        >
          {session?.user ? t('guestbook:guestbook') : t('guestbook:signInGuestbook')}
        </Text>
        {!session && (
          <Link
            href="/api/auth/signin/github"
            css={{
              my: '$4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '$1',
              backgroundColor: '$honghong-colors-brand',
              fontWeight: 700,
              color: '$honghong-colors-white-in-white',
              height: '$10',
              width: '$17',
            }}
            onClick={(e) => {
              e.preventDefault()
              signIn('github')
            }}
          >
            {t('guestbook:signIn')}
          </Link>
        )}
        {session?.user && (
          <Box
            as="form"
            css={{
              my: '$4',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gapY: '$2',
              '@s': {
                flexDirection: 'row',
                gap: 0,
              },
            }}
            onSubmit={leaveEntry}
          >
            <Input
              ref={inputEl}
              aria-label={t('guestbook:yourComment')}
              placeholder={t('guestbook:placeholder')}
              required
              css={{
                '@s': {
                  mr: '$2',
                },
              }}
            />
            <Button
              css={{
                width: '100%',
                height: '$10',
                borderRadius: '$1',
                px: 0,
                '@s': {
                  width: '$13',
                  px: '$4',
                },
              }}
              type="submit"
            >
              {loading ? (
                <div style={containerStyle}>
                  <motion.span
                    style={circleStyle}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                  />
                </div>
              ) : (
                t('guestbook:sign')
              )}
            </Button>
          </Box>
        )}

        <Text size={2} as="p" css={{ color: '$honghong-colors-typeface-secondary' }}>
          {t('guestbook:tip')}
        </Text>

        {session?.user && (
          <Flex
            alignItems={'center'}
            css={{
              my: '$4',
            }}
          >
            <Flex
              alignItems={'center'}
              css={{
                gapX: '$2',
                mr: '$3',
                width: '100%',
              }}
            >
              <Image
                src={session.user.image}
                width={48}
                height={48}
                alt="User avatar"
                className={Avatar()}
              />
              <span>{session.user.name}</span>
            </Flex>
            <Button
              css={{
                width: '50%',
                height: '$10',
                borderRadius: '$1',
                px: 0,
                '@s': {
                  width: '$13',
                  px: '$4',
                },
              }}
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              {t('guestbook:signOut')}
            </Button>
          </Flex>
        )}
      </Box>
      <Box css={{ spaceY: '$6', mt: '$4' }}>
        {loading && (
          <SkeletonTheme
            baseColor={theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'}
            highlightColor={theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'}
          >
            <Flex direction={'column'} css={{ gapY: '$2' }}>
              <Skeleton width={150} height={20} />
              <Flex css={{ gapX: '$2' }}>
                <Skeleton width={80} height={20} />
                <Text as="span" size={3}>
                  /
                </Text>
                <Skeleton width={140} height={20} />
              </Flex>
            </Flex>
          </SkeletonTheme>
        )}
        {entries?.map((entry) => (
          <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </Box>
    </>
  )
}
