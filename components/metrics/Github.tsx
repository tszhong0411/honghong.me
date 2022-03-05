import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { Github } from '@/lib/types'
import MetricCard from './Card'
import { Grid } from '../Grid'

export default function GitHubCard() {
  const { data } = useSWR<Github>('/api/github', fetcher)
  const stars = new Number(data?.stars)
  const followers = new Number(data?.followers)
  const link = 'https://github.com/tszhong0411'

  return (
    <Grid
      columns={1}
      gap={4}
      css={{ my: '$2', width: '100%', '@sm': { gridTemplateColumns: 'repeat(2, 1fr)' } }}
    >
      <MetricCard header="GitHub followers" link={link} metric={followers} isCurrency={false} />
      <MetricCard header="GitHub Stars" link={link} metric={stars} isCurrency={false} />
    </Grid>
  )
}
