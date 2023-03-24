import { useQuery } from '@tanstack/react-query'

import Skeleton from '../Skeleton'

import { Likes } from '@/types'

type LikeCounterProps = {
  slug: string
}

const LikeCounter = (props: LikeCounterProps) => {
  const { slug } = props

  const { data, isLoading, isError } = useQuery<Likes>({
    queryKey: ['likes', slug],
    queryFn: () =>
      fetch(`/api/likes?slug=${slug}`, {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  return (
    <>
      {isLoading || isError ? (
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${data?.likes} 個讚`}</div>
      )}
    </>
  )
}

export default LikeCounter
