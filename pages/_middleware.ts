import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ContentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app cdn.jsdelivr.net *.honghong.me data:;
    style-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
    img-src * blob: data:;
    media-src cdn.jsdelivr.net;
    connect-src *;
    font-src 'self' cdn.jsdelivr.net;
    frame-src giscus.app *.youtube.com;
  `

  const response = NextResponse.next()

  response.headers.set('Content-Security-Policy', ContentSecurityPolicy.replace(/\n/g, ''))
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  return response
}
