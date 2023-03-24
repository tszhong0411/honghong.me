import { useQuery } from '@tanstack/react-query'

import Skeleton from '../Skeleton'

import { Views } from '@/types'

type ViewCounterProps = {
  slug: string
}

const ViewCounter = (props: ViewCounterProps) => {
  const { slug } = props

  const { data, isLoading, isError } = useQuery<Views>({
    queryKey: ['views', slug],
    queryFn: () =>
      fetch(`/api/views?slug=${slug}`, {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  return (
    <>
      {isLoading || isError ? (
        <Skeleton className='h-5 max-w-[70px]' />
      ) : (
        <div>{`${data?.views} 次瀏覽`}</div>
      )}
    </>
  )
}

export default ViewCounter
