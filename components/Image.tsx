import NextImage, { ImageProps } from "next/image";

// eslint-disable-next-line jsx-a11y/alt-text
export default function Image({ ...rest }: ImageProps) {
  return (
    <div>
      <NextImage {...rest} />
    </div>
  );
}
