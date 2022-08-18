import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import MetricCard from '@/components/Metrics/Card'
import { useStyles } from '@/components/Metrics/Metrics.styles'
import { YouTube } from '@/components/Metrics/types'

export default function YouTubeCard() {
  const { data } = useSWR<YouTube>('/api/youtube', fetcher)

  const subscriberCount = new Number(data?.subscriberCount)
  const viewCount = new Number(data?.viewCount)
  const link = 'https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q'
  const { classes } = useStyles()

  return (
    <div className={classes.group}>
      <MetricCard
        header='YouTube Subscribers'
        link={link}
        metric={subscriberCount}
        isCurrency={false}
      />
      <MetricCard
        header='YouTube Views'
        link={link}
        metric={viewCount}
        isCurrency={false}
      />
    </div>
  )
}
