import { Marquee } from '@tszhong0411/ui'
import Image from 'next/image'

const reviews = [
  {
    name: 'Alice',
    username: '@alice',
    body: 'This product exceeded all my expectations. Highly recommended!',
    img: 'https://honghong.me/api/avatar/alice'
  },
  {
    name: 'Bob',
    username: '@bob',
    body: 'A fantastic experience from start to finish. Will definitely use it again.',
    img: 'https://honghong.me/api/avatar/bob'
  },
  {
    name: 'Charlie',
    username: '@charlie',
    body: "Absolutely phenomenal! The best I've ever used.",
    img: 'https://honghong.me/api/avatar/charlie'
  },
  {
    name: 'Mary',
    username: '@mary',
    body: "I'm thoroughly impressed. This is a game-changer.",
    img: 'https://honghong.me/api/avatar/mary'
  },
  {
    name: 'Evan',
    username: '@evan',
    body: 'Remarkable quality and outstanding service. Five stars!',
    img: 'https://honghong.me/api/avatar/evan'
  },
  {
    name: 'Fiona',
    username: '@fiona',
    body: "I can't believe how good this is. Absolutely worth every penny.",
    img: 'https://honghong.me/api/avatar/fiona'
  }
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

type ReviewCardProps = {
  review: (typeof reviews)[number]
}

const ReviewCard = (props: ReviewCardProps) => {
  const { review } = props

  return (
    <div className='bg-accent/50 flex max-w-sm flex-col gap-2 rounded-lg border p-4'>
      <div className='flex items-center gap-2'>
        <Image
          src={review.img}
          width={32}
          height={32}
          alt={review.username}
          className='size-8 rounded-full'
        />
        <div className='flex flex-col'>
          <div className='text-sm font-semibold'>{review.name}</div>
          <div className='text-muted-foreground text-xs'>{review.username}</div>
        </div>
      </div>
      <p>{review.body}</p>
    </div>
  )
}

const MarqueeVertical = () => {
  return (
    <div className='flex max-h-[500px] max-w-[calc(100%+80px)] gap-6'>
      <Marquee gap='20px' fade pauseOnHover direction='up'>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} review={review} />
        ))}
      </Marquee>
      <Marquee gap='20px' fade pauseOnHover reverse direction='up'>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} review={review} />
        ))}
      </Marquee>
    </div>
  )
}

export default MarqueeVertical
