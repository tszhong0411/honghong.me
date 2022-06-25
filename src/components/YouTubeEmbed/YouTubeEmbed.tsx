import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type imgResolution =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault';

type YoutubeEmbedProps = {
  announce?: string;
  id: string;
  title: string;
  activatedClass?: string;
  adNetwork?: boolean;
  aspectHeight?: number;
  aspectWidth?: number;
  iframeClass?: string;
  noCookie?: boolean;
  cookie?: boolean;
  params?: string;
  playerClass?: string;
  playlist?: boolean;
  playlistCoverId?: string;
  poster?: imgResolution;
  webp?: boolean;
  wrapperClass?: string;
  onIframeAdded?: () => void;
  autoplay?: boolean;
  muted?: boolean;
};

export const YouTubeEmbed = ({ ...rest }: YoutubeEmbedProps) => {
  return <LiteYouTubeEmbed {...rest} noCookie={true} />;
};
