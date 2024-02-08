import Script from 'next/script'
import React from 'react'

const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <Script
      async
      data-website-id='e73f35f0-f829-4294-8b8d-95bd677f825b'
      src='https://umami.honghong.me/script.js'
    />
  )
}

export default Analytics
