import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { Github } from '@/lib/types'
import MetricCard from 'components/metrics/Card'

export default function GitHubCard() {
  const { data } = useSWR<Github>('/api/github', fetcher)
  const stars = new Number(data?.stars)
  const followers = new Number(data?.followers)
  const link = 'https://github.com/tszhong0411'

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricCard header="GitHub followers" link={link} metric={followers} isCurrency={false} />
      <MetricCard header="GitHub Stars" link={link} metric={stars} isCurrency={false} />
    </div>
  )
}
