import { NextResponse } from 'next/server'

const isProd = process.env.NODE_ENV === 'production'

const middleware = () => {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' giscus.app *.honghong.me vercel.live${
      isProd ? '' : " 'unsafe-eval'"
    };
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src 'self' *.honghong.me;
    media-src 'self';
    frame-ancestors 'none';
    frame-src giscus.app vercel.live;
    block-all-mixed-content;
    upgrade-insecure-requests;
`

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', csp.replaceAll('\n', ''))

  return response
}

export default middleware
