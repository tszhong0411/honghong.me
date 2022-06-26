import Head from 'next/head';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { ToastContainer } from 'react-toastify';

import { Favicons, SeoProps } from '@/lib/types';

import Footer from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export const defaultMeta = {
  title: '小康 – Developer, YouTuber',
  siteName: '小康 Blog',
  image: 'https://honghong.me/static/images/banner.png',
  type: 'website',
};

export default function Layout(props: SeoProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  meta['title'] = props.templateTitle
    ? `${props.templateTitle}丨${meta.siteName}`
    : meta.title;

  meta['description'] = props.description
    ? props.description
    : t('SEO:defaultDesc');

  return (
    <div className='flex flex-col justify-between'>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta
          name='description'
          content={meta.summary ? meta.summary : meta.description}
        />
        <link
          rel='alternate'
          type='application/rss+xml'
          href={`/feed${
            router.locale !== router.defaultLocale ? `.${router.locale}` : ''
          }.xml`}
        />
        <meta
          property='og:url'
          content={`https://honghong.me${router.asPath}`}
        />
        <link rel='canonical' href={`https://honghong.me${router.asPath}`} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='小康' />
        <meta
          property='og:description'
          content={meta.summary ? meta.summary : meta.description}
        />
        <meta property='og:title' content={meta.title} />
        {meta.date && (
          <meta property='article:published_time' content={meta.date} />
        )}
        {meta.lastmod && (
          <meta property='article:modified_time' content={meta.lastmod} />
        )}
        <meta property='og:image' content={`${meta.image}`} />
        <meta
          property='og:image:alt'
          content={meta.summary ? meta.summary : meta.description}
        />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:locale'
          content={router.locale.replace('-', '_')}
        ></meta>
        <meta name='twitter:image' content={`${meta.image}`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@TszhongLai0411' />
        <meta name='twitter:title' content={meta.title} />
        <meta
          name='twitter:description'
          content={meta.summary ? meta.summary : meta.description}
        />
        <meta name='twitter:creator' content='@TszhongLai0411' />
        {meta.type === 'article' && (
          <script
            type='application/ld+json'
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
                    url: `https://honghong.me${meta.image}`,
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
                      url: `https://honghong.me/static/images/logo/logo-black.png`,
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
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta
          name='msapplication-TileImage'
          content='/static/static/favicon/ms-icon-144x144.png'
        />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <Navbar />
      <main className='mx-auto w-full max-w-5xl px-8 py-12 lg:px-10 xl:px-4'>
        {props.children}
      </main>
      <Footer />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme='dark'
      />
    </div>
  );
}

const favicons: Array<Favicons> = [
  {
    rel: 'apple-touch-icon',
    sizes: '57x57',
    href: '/static/favicon/apple-icon-57x57.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '60x60',
    href: '/static/favicon/apple-icon-60x60.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '72x72',
    href: '/static/favicon/apple-icon-72x72.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '76x76',
    href: '/static/favicon/apple-icon-76x76.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '114x114',
    href: '/static/favicon/apple-icon-114x114.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '120x120',
    href: '/static/favicon/apple-icon-120x120.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '144x144',
    href: '/static/favicon/apple-icon-144x144.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    href: '/static/favicon/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/static/favicon/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/static/favicon/android-icon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/static/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    href: '/static/favicon/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/static/favicon/favicon-16x16.png',
  },
  {
    rel: 'manifest',
    href: '/static/favicon/manifest.json',
  },
];
