import dynamic from 'next/dynamic'
import React from 'react'

import '@/styles/image-zoom.css'
import 'react-medium-image-zoom/dist/styles.css'

type ImageZoomProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<typeof Zoom>

const Zoom = dynamic(() => import('react-medium-image-zoom'), { ssr: false })

const ImageZoom = (props: ImageZoomProps) => {
  const { children, ...rest } = props

  return (
    <Zoom zoomMargin={40} {...rest}>
      {children}
    </Zoom>
  )
}

export default ImageZoom
