import { AspectRatio } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'

type VideoProps = {
  src: string
  width: number
  height: number
} & React.ComponentPropsWithoutRef<'video'>

const Video = (props: VideoProps) => {
  const { src, width, height, controls = true, className, ...rest } = props

  return (
    <AspectRatio ratio={16 / 9}>
      <video
        className={cn('my-4 rounded-lg shadow-lg', className)}
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
