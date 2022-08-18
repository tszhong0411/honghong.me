import { Box } from '@mantine/core'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import MetricCard from '@/components/Metrics/Card'
import { Views } from '@/components/Metrics/types'

export default function BlogTotalViews() {
  const { data } = useSWR<Views>('/api/views', fetcher)

  const pageViews = new Number(data?.total)
  const link = 'https://honghong.me'

  return (
    <Box my={8}>
      <MetricCard
        header='Blog Total Views'
        link={link}
        metric={pageViews}
        isCurrency={false}
      />
    </Box>
  )
}
