import { ImageResponse } from '@vercel/og'
import dayjs from 'dayjs'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const font = fetch(
  new URL(
    '../../../assets/fonts/noto-sans-tc-chinese-traditional-500-normal.woff',
    import.meta.url
  )
).then((res) => res.arrayBuffer())

export const GET = async (req: NextRequest) => {
  const fontData = await font
  const { searchParams } = req.nextUrl
  const title = searchParams.get('title')
  const url = searchParams.get('url') ?? 'honghong.me'
  const image =
    searchParams.get('image') ?? 'https://honghong.me/static/images/avatar.png'
  const author = searchParams.get('author') ?? '小康'
  const date = dayjs(searchParams.get('date')).format('YYYY年MM月DD日')

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
          fontFamily: 'Noto Sans TC',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={85}
            height={85}
            src={image}
            style={{
              borderRadius: '50%',
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
      fonts: [
        {
          name: 'Noto Sans TC',
          data: fontData,
          weight: 500,
        },
      ],
    }
  )
}
