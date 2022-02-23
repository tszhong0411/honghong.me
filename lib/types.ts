export type AuthorFrontMatter = {
  layout?: string;
  name: string;
  avatar: string;
  occupation: string;
  company: string;
  email: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  github: string;
};

export type PostFrontMatter = {
  title: string;
  date: string;
  tags: string[];
  lastmod?: string;
  draft?: boolean;
  summary?: string;
  images?: string;
  authors?: string[];
  layout?: string;
  canonicalUrl?: string;
  slug: string;
  fileName: string;
};

export type PolicyFrontMatter = {
  title: string;
};

export type Toc = {
  value: string;
  depth: number;
  url: string;
}[];

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

export type Policy = {
  title: string;
  layout?: string;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};
