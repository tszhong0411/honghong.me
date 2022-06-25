import { defaultMeta } from '@/components/Container/Container';

export type Github = {
  stars: number;
  followers: number;
};

export type YouTube = {
  subscriberCount: number;
  viewCount: number;
};

export type Views = {
  total: number;
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type ChildrenType = {
  children: React.ReactNode;
};

export type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

export type SeoProps = {
  description?: string;
  templateTitle?: string;
  summary?: string;
  date?: string;
  lastmod?: string;
  children: React.ReactNode;
} & Partial<typeof defaultMeta>;

export type projectDetail = {
  title: string;
  description: string;
  href: string;
};

export type projectData = {
  [key: string]: projectDetail[];
};

export type pcSpecsType = {
  name: string;
  content: string;
};
