import { Group, Skeleton, Text } from '@mantine/core'
import { IconEye } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { usePostViews } from '@/hooks/usePostViews'

type ViewCounterTypes = {
  slug: string
  text?: boolean
  type?: 'GET' | 'POST'
}

export default function ViewCounter({
  slug,
  text = true,
  type = 'POST',
}: ViewCounterTypes) {
  const { views: postViews, isLoading, isError, increment } = usePostViews(slug)

  const { t } = useTranslation('common')
  const views = postViews?.total

  React.useEffect(() => {
    if (type === 'POST') increment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!isLoading && !isError ? (
        text ? (
          <Text>{`${views} ${t('views')}`}</Text>
        ) : (
          <Group spacing={4}>
            <IconEye size={20} />
            <Text sx={{ lineHeight: '20px' }}>{views}</Text>
          </Group>
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
