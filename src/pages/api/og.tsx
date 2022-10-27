/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const description = searchParams.get('description')
  const url = searchParams.get('url') ?? 'honghong.me'
  const username = searchParams.get('username') ?? '@tszhong0411'
  const image =
    searchParams.get('image') ??
    'https://honghong.me/static/images/logo/logo-black.png'
  const author = searchParams.get('author') ?? '小康'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#151515',
          color: '#fff',
          textAlign: 'center',
          padding: '64px 48px',
          backgroundImage: 'url(https://honghong.me/static/images/og/bg.svg)',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={image}
            style={{
              borderRadius: '50%',
              width: '96px',
              height: '96px',
              marginRight: '24px',
            }}
            alt='Logo'
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: '30px',
              lineHeight: '36px',
            }}
          >
            {author}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              backgroundClip: 'text',
              fontWeight: 700,
              fontSize: '56px',
              backgroundImage: 'linear-gradient(#ff416c)',
              color: 'transparent',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontWeight: 700,
              color: '#f3f4f6',
              fontSize: '32px',
              margin: '0',
            }}
          >
            {description}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <p
            style={{
              fontSize: '30px',
              lineHeight: '36px',
              color: '#f3f4f6',
            }}
          >
            {url}
          </p>
          <p
            style={{
              fontSize: '30px',
              lineHeight: '36px',
              color: '#f3f4f6',
            }}
          >
            {username}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
