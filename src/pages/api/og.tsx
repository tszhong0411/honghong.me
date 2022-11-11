/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import dayjs from 'dayjs'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const handler = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const url = searchParams.get('url') ?? 'honghong.me'
  const author = searchParams.get('author') ?? '小康'
  const date = dayjs(searchParams.get('date')).format('DD MMMM YYYY')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#fff',
          padding: '64px 48px',
          backgroundImage:
            'url(https://honghong.me/static/images/og/gradient_bg.png)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src='https://honghong.me/static/images/logo/logo-black.png'
            style={{
              borderRadius: '50%',
              width: '85px',
              height: '85px',
            }}
            alt='logo'
          />
          <div
            style={{
              fontSize: '32px',
              marginLeft: '16px',
              fontWeight: '900',
            }}
          >
            {author}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p
            style={{
              fontSize: '44px',
              fontWeight: '900',
              color: 'rgb(236, 237, 238)',
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: '36px',
              fontWeight: '700',
              color: 'rgba(236, 237, 238, 0.7)',
            }}
          >
            {url} · {date}
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

export default handler
