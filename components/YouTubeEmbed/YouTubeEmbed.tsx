import LiteYouTubeEmbed from 'react-lite-youtube-embed'

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export const YouTubeEmbed = ({ id, noCookie = true, title = 'Youtube embed' }) => {
  return <LiteYouTubeEmbed id={id} poster="hqdefault" noCookie={noCookie} title={title} />
}
