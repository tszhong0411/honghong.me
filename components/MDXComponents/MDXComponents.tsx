import { Alert } from '../Alert'
import { CloudinaryImg } from '../Image'
import CustomLink from '../Link'
import Pre from '../Pre'
import { YouTubeEmbed } from '../YouTubeEmbed'

export const MDXComponents = {
  CloudinaryImg,
  YouTubeEmbed,
  Alert,
  a: CustomLink,
  pre: Pre,
}

export default MDXComponents
