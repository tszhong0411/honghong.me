import { NextResponse } from 'next/server'

const middleware = () => {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.honghong.me vercel.live va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' vercel.live;
    img-src * blob: data:;
    font-src 'self' data: assets.vercel.com vercel.live;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src *;
    media-src 'self';
    frame-ancestors 'none';
    frame-src vercel.live;
    block-all-mixed-content;
    upgrade-insecure-requests;
    worker-src blob:;
  `

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', csp.replaceAll('\n', ''))

  return response
}

export default middleware
