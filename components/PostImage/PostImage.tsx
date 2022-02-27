import NextImage, { ImageProps } from 'next/image'

export default function PostImage({ ...rest }: ImageProps) {
  return (
    <div nextjs-image="true">
      <NextImage {...rest} data-fancybox="gallery" />
    </div>
  )
}
