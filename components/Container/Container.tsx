import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { styled } from '@/lib/stitches.config'

import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { Flex } from '../Flex'

export default function Container(props) {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: '小康 – Developer, YouTuber',
    description: {
      'zh-TW': '前端工程師, YouTuber',
      en: 'Front-end developer, YouTuber.',
    },
    image: 'https://honghong.me/static/images/banner.png',
    type: 'website',
    ...customMeta,
  }

  return (
    <Flex direction={'column'} justifyContent={'between'}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta
          name="description"
          content={meta.summary ? meta.summary : meta.description[router.locale]}
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href={`/feed${router.locale !== router.defaultLocale ? `.${router.locale}` : ''}.xml`}
        />
        <meta property="og:url" content={`https://honghong.me${router.asPath}`} />
        <link rel="canonical" href={`https://honghong.me${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="小康" />
        <meta
          property="og:description"
          content={meta.summary ? meta.summary : meta.description[router.locale]}
        />
        <meta property="og:title" content={meta.title} />
        {meta.date && <meta property="article:published_time" content={meta.date} />}
        {meta.lastmod && <meta property="article:modified_time" content={meta.lastmod} />}
        <meta property="og:image" content={meta.image} />
        <meta
          property="og:image:alt"
          content={meta.summary ? meta.summary : meta.description[router.locale]}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={router.locale.replace('-', '_').toLowerCase()}></meta>
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TszhongLai0411" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description[router.locale]} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:creator" content="@TszhongLai0411" />
        {meta.type === 'article' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://honghong.me${router.asPath}`,
                  },
                  headline: meta.title,
                  image: {
                    '@type': 'ImageObject',
                    url: meta.image,
                  },
                  datePublished: meta.date,
                  dateModified: meta.lastmod,
                  author: {
                    '@type': 'Person',
                    name: '小康',
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: '小康',
                    logo: {
                      '@type': 'ImageObject',
                      url: `https://honghong.me/static/images/logo/logo-white.png`,
                    },
                  },
                  description: meta.summary,
                },
                null,
                2
              ),
            }}
          />
        )}
      </Head>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </Flex>
  )
}

const Main = styled('main', {
  mx: 'auto',
  width: '100%',
  maxWidth: '$max-w-3xl',
  px: '32px',
  py: '48px',
  '@sm': {
    px: '24px',
  },
  '@xl': {
    px: '0',
  },
})
