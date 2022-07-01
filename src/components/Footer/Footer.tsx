import { useRouter } from 'next/router';

import { isProd } from '@/lib/isProduction';

import { FooterLinks } from '@/components/Footer/FooterLinks';
import Link from '@/components/Link';
import NowPlaying from '@/components/NowPlaying';

export default function Footer() {
  const { locale, defaultLocale } = useRouter();

  return (
    <>
      <footer className='mx-auto mt-8 w-full max-w-5xl px-8'>
        <div className='divider'></div>
        <div className='mx-auto mt-6 flex flex-row flex-wrap gap-1 pt-12'>
          {isProd && <NowPlaying />}
          <div className='grid w-full grid-cols-2 gap-4 pb-16 sm:grid-cols-3'>
            {FooterLinks.middleLinks.map((item, index) => {
              return (
                <div
                  key={index}
                  className='mb-10 flex flex-col items-start gap-y-4 pr-4'
                >
                  {item.list.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className='link link-hover'
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
