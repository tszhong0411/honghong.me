import { Box, Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
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
  const { t } = useTranslation();

  React.useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug.replace(`.${locale}`, '')}`, {
        method: type,
      });

    registerView();
  }, [locale, slug, type]);

  return (
    <>
      {views > 0 ? (
        text ? (
          <span>{`${views.toLocaleString()} ${t('common:views')}`}</span>
        ) : (
          <Box
            component='span'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Eye size={20} />
            {views.toLocaleString()}
          </Box>
        )
      ) : (
        <Skeleton
          height={20}
          sx={{
            maxWidth: 70,
          }}
        />
      )}
    </>
  );
}
