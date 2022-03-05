import Image from '../Image'
import CustomLink from '../Link'
import CustomIframe from '../Iframe'
import Pre from '../Pre'

export const MDXComponents = {
  Image,
  CustomIframe,
  a: CustomLink,
  pre: Pre,
}

export default MDXComponents
