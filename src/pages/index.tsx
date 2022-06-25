import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { isProd } from '@/lib/isProduction';
import { sortedBlogPost } from '@/lib/utils/contentlayer';
import formatDate from '@/lib/utils/formatDate';

import Container from '@/components/Container';
import Hero from '@/components/Hero';
import { CloudinaryImg } from '@/components/Image';
import Link from '@/components/Link';
import ViewCounter from '@/components/ViewCounter';

export const MAX_DISPLAY = 5;

export const getStaticProps = async (locale: { locale: string }) => {
  const sortedPosts = sortedBlogPost(allBlogs);
  const filteredPosts = sortedPosts.filter(
    (slug) =>
      slug.slug.split('.')[slug.slug.split('.').length - 1] === locale.locale
  );

  return { props: { filteredPosts } };
};

export default function Home({
  filteredPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <Container>
      <div className='divide-y divide-border-primary dark:divide-border-primary-dark'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <Hero />
          <h2 className='text-3xl font-medium sm:text-4xl'>
            {t('common:latestPosts')}
          </h2>
        </div>
        <ul
          className='divide-y divide-border-primary dark:divide-border-primary-dark'
          data-test='posts_list'
        >
          {!filteredPosts && !filteredPosts.length && (
            <p className='text-3xl'>{t('common:noPostsFound')}</p>
          )}
          {filteredPosts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, image } = post;
            const formattedSlug = slug.replace(`.${locale}`, '');
            return (
              <li key={formattedSlug} className='py-12'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0'>
                    <dl>
                      <dt className='sr-only'>{t('common:publishedOn')}</dt>
                      <dd className='mb-4 flex flex-row items-center gap-x-3'>
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                        {' - '}
                        {isProd && (
                          <ViewCounter slug={slug} text={false} type='GET' />
                        )}
                      </dd>
                    </dl>
                    <div className='flex flex-col items-center sm:flex-row xl:col-span-3'>
                      <div className='mx-2 my-8 w-full sm:my-0 sm:w-1/3'>
                        <Link href={`/blog/${formattedSlug}`}>
                          <div className='overflow-hidden rounded-xl sm:px-0'>
                            <CloudinaryImg
                              noStyle
                              className='duration-500 hover:scale-110'
                              publicId={image}
                              alt={`${title} Cover`}
                              width={1280}
                              height={720}
                              preview={false}
                            />
                          </div>
                        </Link>
                      </div>
                      <div className='mx-2 w-full sm:w-2/3'>
                        <div>
                          <div>
                            <h2 className='text-2xl font-bold'>
                              <Link
                                href={`/blog/${formattedSlug}`}
                                data-cy='post-title'
                                className='border-b-2 border-transparent duration-300 hover:border-brand dark:text-gray-50'
                              >
                                {title}
                              </Link>
                            </h2>
                          </div>
                          <div className='mb-8 mt-6 text-typeface-secondary dark:text-typeface-secondary-dark'>
                            {summary}
                          </div>
                          <Link
                            href={`/blog/${formattedSlug}`}
                            aria-label={`Read "${title}"`}
                            className='border-b-2 border-transparent duration-300 hover:border-brand'
                          >
                            {t('common:readMore')} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {filteredPosts.length > MAX_DISPLAY && (
        <div className='flex justify-end'>
          <Link
            href='/blog'
            className='border-b-2 border-transparent duration-300  hover:border-brand'
            aria-label='all posts'
          >
            {t('common:allPosts')} &rarr;
          </Link>
        </div>
      )}
    </Container>
  );
}
