import { NextResponse } from 'next/server'

const middleware = () => {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' giscus.app *.honghong.me vercel.live;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    font-src 'self' assets.vercel.com fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src *;
    media-src 'self';
    frame-ancestors 'none';
    frame-src giscus.app vercel.live;
    block-all-mixed-content;
    upgrade-insecure-requests;
    worker-src blob:;
`

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', csp.replaceAll('\n', ''))

  return response
}

export default middleware
