import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import Skeleton from '../Skeleton'

import { Likes } from '@/types'

type LikeCounterProps = {
  slug: string
}

const LikeCounter = (props: LikeCounterProps) => {
  const { slug } = props

  const { data, isLoading } = useSWR<Likes>(`/api/likes?slug=${slug}`, fetcher)

  return (
    <>
      {isLoading ? (
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${data?.likes} likes`}</div>
      )}
    </>
  )
}

export default LikeCounter
