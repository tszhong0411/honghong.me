import React from 'react'
import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

type ImageZoomProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<typeof Zoom>

const ImageZoom = (props: ImageZoomProps) => {
  const { children, ...rest } = props

  return (
    <Zoom
      overlayBgColorStart='rgba(0, 0, 0, 0)'
      overlayBgColorEnd='rgba(0, 0, 0, 0.8)'
      zoomMargin={40}
      {...rest}
    >
      {children}
    </Zoom>
  )
}

export default ImageZoom
