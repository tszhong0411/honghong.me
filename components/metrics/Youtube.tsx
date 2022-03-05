import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { YouTube } from '@/lib/types'
import MetricCard from './Card'
import { Grid } from '../Grid'

export default function YouTubeCard() {
  const { data } = useSWR<YouTube>('/api/youtube', fetcher)

  const subscriberCount = new Number(data?.subscriberCount)
  const viewCount = new Number(data?.viewCount)
  const link = 'https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q'
  return (
    <Grid
      columns={1}
      gap={4}
      css={{ my: '$2', width: '100%', '@sm': { gridTemplateColumns: 'repeat(2, 1fr)' } }}
    >
      <MetricCard
        header="YouTube Subscribers"
        link={link}
        metric={subscriberCount}
        isCurrency={false}
      />
      <MetricCard header="YouTube Views" link={link} metric={viewCount} isCurrency={false} />
    </Grid>
  )
}
