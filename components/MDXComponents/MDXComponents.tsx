import { Alert } from '@/components/Alert'
import { CloudinaryImg } from '@/components/Image'
import CustomLink from '@/components/Link'
import Pre from '@/components/Pre'

import { YouTubeEmbed } from '../YouTubeEmbed'

export const MDXComponents = {
  CloudinaryImg,
  YouTubeEmbed,
  Alert,
  a: CustomLink,
  pre: Pre,
}

export default MDXComponents
