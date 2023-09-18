import { AspectRatio } from '@/components/ui'
import cn from '@/utils/cn'

/**
 * The props of {@link Video}.
 */
type VideoProps = {
  /**
   * The URL of the video.
   */
  src: string
  /**
   * The width of the video.
   */
  width: number
  /**
   * The height of the video.
   */
  height: number
  /**
   * Whether to show the controls of the video.
   */
  controls?: boolean
  /**
   * The classes to pass to the video.
   */
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
