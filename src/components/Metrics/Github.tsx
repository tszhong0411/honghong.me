import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import MetricCard from '@/components/Metrics/Card'

import { useStyles } from './Metrics.styles'

const GithubCard = () => {
  const { data } = useSWR<{ followers: number; stars: number }>(
    '/api/github',
    fetcher
  )
  const stars = Number(data?.stars)
  const followers = Number(data?.followers)
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
