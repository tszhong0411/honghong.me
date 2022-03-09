import Image from '@/components/Image'
import CustomLink from '@/components/Link'
import CustomIframe from '@/components/Iframe'
import Pre from '@/components/Pre'

export const MDXComponents = {
  Image,
  CustomIframe,
  a: CustomLink,
  pre: Pre,
}

export default MDXComponents
