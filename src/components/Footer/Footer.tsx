import { useRouter } from 'next/router';

import { isProd } from '@/lib/isProduction';

import Link from '@/components/Link';
import NowPlaying from '@/components/NowPlaying';

export default function Footer() {
  const { locale, defaultLocale } = useRouter();

  //#region  //*=========== Footer links ===========
  const footerLinks = {
    middleLinks: [
      {
        list: [
          {
            href: '/',
            title: 'Home',
          },
          {
            href: '/blog',
            title: 'Blog',
          },
          {
            href: '/about',
            title: 'About',
          },
          {
            href: '/feed.xml',
            title: 'RSS',
          },
        ],
      },
      {
        list: [
          {
            href: '/guestbook',
            title: 'Guestbook',
          },
          {
            href: '/uses',
            title: 'Uses',
          },
          {
            href: '/projects',
            title: 'Projects',
          },
          {
            href: 'https://umami.honghong.me/share/KTWjRi4f/blog',
            title: 'Analytics',
          },
        ],
      },
      {
        list: [
          {
            href: 'https://www.facebook.com/tszhonglai.0411/',
            title: 'Facebook',
          },
          {
            href: 'https://www.instagram.com/tszhong0411/',
            title: 'Instagram',
          },
          {
            href: 'https://github.com/tszHong0411',
            title: 'GitHub',
          },
          {
            href: 'https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q',
            title: 'YouTube',
          },
        ],
      },
    ],
  };
  //#endregion  //*======== Footer links ===========

  return (
    <>
      <footer className='mx-auto mt-8 w-full max-w-5xl px-8 xl:px-0'>
        <div className='mx-auto mt-6 flex flex-row flex-wrap gap-1 border-t border-border-primary pt-12 dark:border-border-primary-dark'>
          {isProd && <NowPlaying />}
          <div className='grid w-full grid-cols-2 gap-4 pb-16 sm:grid-cols-3'>
            {footerLinks.middleLinks.map((item, index) => {
              return (
                <div
                  key={index}
                  className='mb-10 flex flex-col items-start gap-y-4 pr-4'
                >
                  {item.list.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className='border-b-2 border-transparent duration-300 hover:border-brand'
                        href={
                          item.href === '/feed.xml'
                            ? `/feed${
                                locale === defaultLocale ? '' : `.${locale}`
                              }.xml`
                            : item.href
                        }
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className='mx-auto mb-8 w-full font-medium'>
          © {new Date().getFullYear()}
          {' 小康'}
        </div>
      </footer>
    </>
  );
}
