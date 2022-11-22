import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import MetricCard from '@/components/Metrics/Card'

import { useStyles } from './Metrics.styles'

const GithubCard = () => {
  const { data: dataStars } = useSWR<{ stars: number }>(
    '/api/github/stars',
    fetcher
  )
  const { data: dataFollowers } = useSWR<{ followers: number }>(
    '/api/github/stars',
    fetcher
  )
  const stars = Number(dataStars?.stars)
  const followers = Number(dataFollowers?.followers)
  const link = 'https://github.com/tszhong0411'
  const { classes } = useStyles()

  return (
    <div className={classes.group}>
      <MetricCard
        header='GitHub followers'
        link={link}
        metric={followers}
        isCurrency={false}
      />
      <MetricCard
        header='GitHub Stars'
        link={link}
        metric={stars}
        isCurrency={false}
      />
    </div>
  )
}

export default GithubCard
