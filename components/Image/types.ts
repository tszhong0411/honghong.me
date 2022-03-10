export type CloudinaryImgType = {
  publicId: string
  height: string | number
  width: string | number
  alt: string
  title?: string
  className?: string
  preview?: boolean
  noStyle?: boolean
  aspect?: {
    width: number
    height: number
  }
  mdx?: boolean
} & React.ComponentPropsWithoutRef<'figure'>
