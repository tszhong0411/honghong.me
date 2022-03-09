import { format } from 'date-fns'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import useSWR, { useSWRConfig } from 'swr'

import fetcher from '@/lib/fetcher'

import Link from '@/components/Link'

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
    <div className="flex flex-col space-y-2">
      <div>{entry.body}</div>
      <div className="flex flex-row items-center space-x-3">
        <p className="text-sm text-typeface-secondary dark:text-typeface-secondary-dark">
          {entry.created_by}
        </p>
        <span className="text-xs">/</span>
        <p className="text-sm text-typeface-secondary dark:text-typeface-secondary-dark">
          {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}
        </p>
        {user && entry.created_by === user.name && (
          <>
            <span className="text-xs">/</span>
            <button
              className="flex h-6 w-8 cursor-pointer items-center justify-center text-sm text-themeColor-600 dark:text-brand"
              onClick={deleteEntry}
            >
              {t('guestbook:delete')}
            </button>
          </>
        )}
      </div>
    </div>
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
      <div className="my-4 w-full max-w-2xl rounded bg-body-secondary p-5 dark:bg-body-secondary-dark">
        <h5 className="text-lg font-bold md:text-xl">
          {session?.user ? t('guestbook:guestbook') : t('guestbook:signInGuestbook')}
        </h5>
        {!session && (
          <Link
            href="/api/auth/signin/github"
            className="rouneded my-4 flex h-10 w-24 items-center justify-center bg-brand font-bold text-white"
            onClick={(e) => {
              e.preventDefault()
              signIn('github')
            }}
          >
            {t('guestbook:signIn')}
          </Link>
        )}
        {session?.user && (
          <form
            className="my-4 flex flex-col items-center gap-y-2 s:flex-row s:gap-0"
            onSubmit={leaveEntry}
          >
            <input
              ref={inputEl}
              aria-label={t('guestbook:yourComment')}
              placeholder={t('guestbook:placeholder')}
              required
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100 s:mr-2"
            />
            <button
              className="h-10 w-full rounded bg-brand px-0 text-white s:w-14 s:px-4"
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
            </button>
          </form>
        )}

        <p className="text-sm text-typeface-secondary dark:text-typeface-secondary-dark">
          {t('guestbook:tip')}
        </p>

        {session?.user && (
          <div className="my-4 flex items-center">
            <div className="mr-3 flex w-full items-center gap-x-2">
              <Image
                src={session.user.image}
                width={48}
                height={48}
                alt="User avatar"
                className="rounded-full"
              />
              <span>{session.user.name}</span>
            </div>
            <button
              className="s:w-13 h-10 w-1/2 rounded bg-brand px-0 text-white s:px-4"
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              {t('guestbook:signOut')}
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-6">
        {loading && (
          <SkeletonTheme
            baseColor={theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'}
            highlightColor={theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'}
          >
            <div className="flex flex-col gap-y-2">
              <Skeleton width={150} height={20} />
              <div className="gap-x-2">
                <Skeleton width={80} height={20} />
                <span className="text-base">/</span>
                <Skeleton width={140} height={20} />
              </div>
            </div>
          </SkeletonTheme>
        )}
        {entries?.map((entry) => (
          <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
    </>
  )
}
