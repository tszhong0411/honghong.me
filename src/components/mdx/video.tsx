import { AspectRatio } from '@/components/ui'
import { cn } from '@/utils/cn'

type VideoProps = {
  src: string
  width: number
  height: number
  controls?: boolean
  className?: string
}

const Video = (props: VideoProps) => {
  const { src, width, height, controls = true, className } = props

  return (
    <AspectRatio ratio={16 / 9}>
      <video
        className={cn('object-fit my-4 rounded-lg shadow-lg', className)}
        loop
        muted
        src={src}
        controls={controls}
        width={width}
        height={height}
      />
    </AspectRatio>
  )
}

export default Video
