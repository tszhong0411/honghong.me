import { Box, Skeleton } from '@mantine/core'
import { IconEye } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Views } from '@/components/Metrics/types'
import { ViewCounterTypes } from '@/components/ViewCounter/types'

export default function ViewCounter({
  slug,
  text = true,
  type = 'POST',
}: ViewCounterTypes) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
  const views = new Number(data?.total)
  const { t } = useTranslation('common')

  React.useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: type,
      })

    registerView()
  }, [slug, type])

  return (
    <>
      {views > 0 ? (
        text ? (
          <span>{`${views.toLocaleString()} ${t('views')}`}</span>
        ) : (
          <Box
            component='span'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <IconEye size={20} />
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
  )
}
