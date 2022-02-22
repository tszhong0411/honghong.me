import NextImage, { ImageProps } from "next/image";

// eslint-disable-next-line jsx-a11y/alt-text
export default function PostImage({ ...rest }: ImageProps) {
  return (
    <div nextjs-image="true">
      <NextImage {...rest} data-fancybox="gallery" />
    </div>
  );
}
