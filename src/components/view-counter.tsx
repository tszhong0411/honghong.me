import { Skeleton } from '@tszhong0411/ui'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { Views } from '@/types'

type ViewCounterProps = {
  slug: string
}

const ViewCounter = (props: ViewCounterProps) => {
  const { slug } = props

  const { data, isLoading } = useSWR<Views>(`/api/views?slug=${slug}`, fetcher)

  return (
    <>
      {isLoading ? (
        <Skeleton className='h-5 w-16' />
      ) : (
        <div>{`${data?.views} views`}</div>
      )}
    </>
  )
}

export default ViewCounter
