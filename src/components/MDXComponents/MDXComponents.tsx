import { CloudinaryImg } from '@/components/Image';
import CustomLink from '@/components/Link';
import { Note } from '@/components/Note';
import Pre from '@/components/Pre';

import { YouTubeEmbed } from '../YouTubeEmbed';

export const MDXComponents = {
  Note,
  CloudinaryImg,
  YouTubeEmbed,
  a: CustomLink,
  pre: Pre,
};

export default MDXComponents;
