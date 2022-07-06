import { useMantineColorScheme } from '@mantine/core';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import useSWR from 'swr';
import { Eye } from 'tabler-icons-react';

import fetcher from '@/lib/fetcher';

import { Views } from '@/components/Metrics/types';

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
  const [mounted, setMounted] = React.useState(false);
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

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
          `${views.toLocaleString()} ${t('common:views')}`
        ) : (
          <span className='flex items-center gap-x-1'>
            <Eye size={20} />
            {views.toLocaleString()}
          </span>
        )
      ) : (
        <SkeletonTheme
          baseColor={dark ? '#202020' : '#d9d9d9'}
          highlightColor={dark ? '#444444' : '#ecebeb'}
        >
          <Skeleton width={120} height={20} />
        </SkeletonTheme>
      )}
    </span>
  );
}
