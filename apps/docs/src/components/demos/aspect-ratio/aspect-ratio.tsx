import { AspectRatio } from '@tszhong0411/ui'
import Image from 'next/image'

const AspectRatioDemo = () => {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        src='https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80'
        alt='A smooth, minimalist white background with subtle diagonal light-gray gradients by Drew Beamer'
        fill
        className='rounded-lg object-cover'
      />
    </AspectRatio>
  )
}

export default AspectRatioDemo
