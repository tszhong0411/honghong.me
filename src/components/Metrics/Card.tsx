import { Card, Skeleton, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import Link from '@/components/Link'

const MetricCard = (props) => {
  const { header, link, metric, isCurrency } = props
  const theme = useMantineTheme()
  const dark = theme.colorScheme === 'dark'

  return (
    <Card
      shadow='sm'
      p='lg'
      radius='lg'
      sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      <Link
        aria-label={header}
        href={link}
        sx={{
          color: dark ? '#C1C2C5' : '#1f2937',
          ...(dark && {
            '&:hover': {
              color: 'white',
            },
          }),
        }}
      >
        {header}
      </Link>
      <Text lh='40px' fz={36} fw={800}>
        {metric > 0 && isCurrency && '$'}
        {metric > 0 ? (
          metric.toLocaleString()
        ) : (
          <Skeleton height={40} radius='xl' width='35%' />
        )}
      </Text>
    </Card>
  )
}

export default MetricCard
