import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import { Views } from '@/lib/types';

import { ViewCounterTypes } from './types';

export default function ViewCounter({
  slug,
  text = true,
  type = 'POST',
}: ViewCounterTypes) {
  const { locale } = useRouter();
  const { data } = useSWR<Views>(
    `/api/views/${slug.replace(`.${locale}`, '')}`,
    fetcher
  );
  const views = new Number(data?.total);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const registerView = () =>
      fetch(`/api/views/${slug.replace(`.${locale}`, '')}`, {
        method: type,
      });

    registerView();
  }, [locale, slug, type]);

  if (!mounted) return null;

  return (
    <span>
      {views > 0 ? (
        text ? (
          `${views.toLocaleString()} views`
        ) : (
          <span className='flex items-center gap-x-1'>
            <BsFillEyeFill size={20} />
            {views.toLocaleString()}
          </span>
        )
      ) : (
        <SkeletonTheme
          baseColor={
            theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'
          }
          highlightColor={
            theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'
          }
        >
          <Skeleton width={120} height={20} />
        </SkeletonTheme>
      )}
    </span>
  );
}
