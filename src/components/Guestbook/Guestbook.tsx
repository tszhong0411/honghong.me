import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

import fetcher from '@/lib/fetcher';
import { useModal } from '@/lib/store';
import formatDate from '@/lib/utils/formatDate';

import Link from '@/components/Link';

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig();
  const { setValue } = useModal();
  const { t } = useTranslation();
  const { locale } = useRouter();

  const deleteEntry = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    });

    mutate('/api/guestbook');

    setValue({ status: false });

    toast.success(t('common:delete_successful'));
  };

  const Cancel = () => (
    <button
      className='btn btn-outline uppercase'
      onClick={() => setValue({ status: false })}
    >
      {t('common:cancel')}
    </button>
  );

  const Delete = () => (
    <button className='btn btn-error uppercase' onClick={deleteEntry}>
      {t('common:delete')}
    </button>
  );

  const Message = () => (
    <div className='flex flex-col gap-4'>
      <p>{t('common:Guestbook_deleteModal_message')}</p>
      <p className='rounded-md bg-error px-2 py-4 text-error-content'>{`> ${entry.body}`}</p>
    </div>
  );

  const deleteHandler = () => {
    setValue({
      status: true,
      title: t('common:Guestbook_deleteModal_title'),
      message: <Message />,
      children: (
        <>
          <Cancel />
          <Delete />
        </>
      ),
    });
  };

  return (
    <div className='flex flex-col space-y-2'>
      <div>{entry.body}</div>
      <div className='flex flex-row space-x-3 sm:items-center'>
        <p className='badge badge-primary text-sm'>{entry.created_by}</p>
        <span className='hidden text-xs sm:inline-block'>/</span>
        <p className='badge text-sm'>
          {formatDate(new Date(entry.updated_at), locale)}
        </p>
        {user && entry.created_by === user.name && (
          <>
            <span className='hidden text-xs sm:inline-block'>/</span>
            <button
              className='cursor-pointer text-sm text-primary-500'
              onClick={deleteHandler}
            >
              {t('common:delete')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Guestbook({ fallbackData }) {
  const [mounted, setMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const inputEl = React.useRef(null);
  const { theme, resolvedTheme } = useTheme();
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const { data: entries } = useSWR('/api/guestbook', fetcher, {
    fallbackData,
  });
  const { t } = useTranslation();

  const leaveEntry = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputEl.current.value !== '') {
      setLoading(true);
      const res = await fetch('/api/guestbook', {
        body: JSON.stringify({
          body: inputEl.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const { error } = await res.json();
      if (error) {
        toast.error(error);
        return;
      }

      inputEl.current.value = '';
      mutate('/api/guestbook');
      toast.success(t('common:Guestbook_success'));
      setLoading(false);
    } else {
      toast.error(t('common:Guestbook_error'));
    }
  };

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className='my-4 w-full max-w-2xl rounded bg-base-200 p-5'
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
      >
        <h5 className='text-lg font-bold md:text-xl'>
          {session?.user
            ? t('common:Guestbook_guestbook')
            : t('common:Guestbook_signInGuestbook')}
        </h5>
        {!session && (
          <Link
            href='/api/auth/signin/github'
            className='btn btn-primary my-4 min-w-[6rem] font-medium'
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            {t('common:Guestbook_signIn')}
          </Link>
        )}
        {session?.user && (
          <form className='my-4 flex flex-col gap-2' onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label={t('common:Guestbook_yourComment')}
              placeholder={t('common:Guestbook_placeholder')}
              required
              className='input input-bordered input-primary w-full'
            />
            <button
              className={cn('btn btn-primary', { loading: loading })}
              type='submit'
            >
              {t('common:Guestbook_sign')}
            </button>
          </form>
        )}
        <p className='text-sm'>{t('common:Guestbook_tip')}</p>

        {session?.user && (
          <>
            <div className='divider'></div>
            <div className='my-4 flex items-center'>
              <div className='mr-3 flex w-full items-center gap-4'>
                <Image
                  src={session.user.image}
                  width={48}
                  height={48}
                  alt='User avatar'
                  className='rounded-full'
                />
                <span>{session.user.name}</span>
              </div>
              <button
                className='btn btn-primary min-w-[8rem] text-white'
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                {t('common:Guestbook_signOut')}
              </button>
            </div>
          </>
        )}
      </motion.div>
      <div className='mt-4 space-y-6'>
        {loading && (
          <SkeletonTheme
            baseColor={
              theme === 'dark' || resolvedTheme === 'dark'
                ? '#202020'
                : '#d9d9d9'
            }
            highlightColor={
              theme === 'dark' || resolvedTheme === 'dark'
                ? '#444444'
                : '#ecebeb'
            }
          >
            <div className='flex flex-col gap-y-2'>
              <Skeleton width={150} height={20} />
              <div className='flex flex-row gap-x-2'>
                <Skeleton width={80} height={20} />
                <span className='text-base'>/</span>
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
  );
}
