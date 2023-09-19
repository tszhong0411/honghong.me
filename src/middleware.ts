import { type NextRequest, NextResponse } from 'next/server'
const isProd = process.env.NODE_ENV === 'production'

const middleware = (request: NextRequest) => {
  const nonce = crypto.randomUUID()

  const ContentSecurityPolicy = `
    base-uri 'self';
    form-action 'self';
    default-src 'self';
    script-src 'self'${
      isProd ? '' : " 'unsafe-eval' 'unsafe-inline'"
    } giscus.app *.honghong.me vercel.live${isProd ? " 'nonce-${nonce}'" : ''};
    style-src 'self'${isProd ? '' : " 'unsafe-inline'"}${
      isProd ? " 'nonce-${nonce}'" : ''
    };
    connect-src 'self';
    img-src 'self' blob: data:;
    font-src 'self';
    media-src *;
    frame-src *;
  `

  const requestHeaders = new Headers(request.headers)

  requestHeaders.set(
    'Content-Security-Policy',
    ContentSecurityPolicy.replaceAll('\n', '')
  )
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })

  response.headers.set(
    'Content-Security-Policy',
    ContentSecurityPolicy.replaceAll('\n', '')
  )
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export default middleware
