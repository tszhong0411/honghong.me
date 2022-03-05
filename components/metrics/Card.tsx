import MetricsContentLoader from '@/components/metrics/MetricsContentLoader'
import { useState, useEffect } from 'react'
import { Box } from '@/components/Box'
import Link from '@/components/Link'
import { Text } from './../Text/Text'

export default function MetricCard({ header, link, metric, isCurrency }) {
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Box
      css={{
        width: '100%',
        p: '$4',
        borderRadius: '$3',
        borderWidth: '2px',
        borderColor: '$honghong-colors-border-primary',
      }}
    >
      <Link aria-label={header} href={link}>
        {header}
      </Link>
      <Text
        size={7}
        as="p"
        css={{
          mt: '$2',
          fontWeight: 700,
        }}
      >
        {metric > 0 && isCurrency && '$'}
        {metric > 0 ? metric.toLocaleString() : <MetricsContentLoader />}
      </Text>
    </Box>
  )
}
