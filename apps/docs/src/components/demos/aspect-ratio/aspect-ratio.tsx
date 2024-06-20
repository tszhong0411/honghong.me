import { AspectRatio } from '@tszhong0411/ui'
import Image from 'next/image'

const AspectRatioDemo = () => {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        src='https://images.unsplash.com/photo-1717765911288-5512eba79b41?q=80&w=3270'
        fill
        alt='A grassy field with trees and a mountain in the background, by Benjamin Ashton'
        className='rounded-lg object-cover'
      />
    </AspectRatio>
  )
}

export default AspectRatioDemo
