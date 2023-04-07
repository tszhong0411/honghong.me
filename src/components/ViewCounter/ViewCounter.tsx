import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import Skeleton from '../Skeleton'

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
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${data?.views} 次瀏覽`}</div>
      )}
    </>
  )
}

export default ViewCounter
