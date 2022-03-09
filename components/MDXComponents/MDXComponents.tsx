import Image from '@/components/Image'
import CustomLink from '@/components/Link'
import Pre from '@/components/Pre'

import { YouTubeEmbed } from '../YouTubeEmbed'

export const MDXComponents = {
  Image,
  YouTubeEmbed,
  a: CustomLink,
  pre: Pre,
}

export default MDXComponents
