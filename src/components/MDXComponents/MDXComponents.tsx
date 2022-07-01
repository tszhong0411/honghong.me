import { CloudinaryImg } from '@/components/Image';
import Kbd from '@/components/Kbd';
import CustomLink from '@/components/Link';
import Pre from '@/components/Pre';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

export const MDXComponents = {
  CloudinaryImg,
  YouTubeEmbed,
  Kbd,
  a: CustomLink,
  pre: Pre,
};

export default MDXComponents;
