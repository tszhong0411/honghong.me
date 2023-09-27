import React from 'react'

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
} & React.ComponentPropsWithoutRef<'video'>

const Video = (props: VideoProps) => {
  const { src, width, height, controls = true, className, ...rest } = props

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
        {...rest}
      />
    </AspectRatio>
  )
}

export default Video
