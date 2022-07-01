import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { sortedBlogPost } from '@/lib/utils/contentlayer';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import Link from '@/components/Link';
import PostsList from '@/components/PostsList/PostsList';

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
    <Layout>
      <div>
        <div className='pt-6 pb-8'>
          <Hero />
          <h2 className='text-3xl font-medium dark:text-primary-content sm:text-4xl'>
            {t('common:latestPosts')}
          </h2>
        </div>
        <div className='divider'></div>
        <ul>
          {filteredPosts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug } = post;
            const formattedSlug = slug.replace(`.${locale}`, '');

            return (
              <PostsList
                key={formattedSlug}
                post={post}
                divider={index !== MAX_DISPLAY - 1}
              />
            );
          })}
        </ul>
      </div>
      {filteredPosts.length > MAX_DISPLAY && (
        <div className='flex justify-end'>
          <Link
            href='/blog'
            aria-label='all posts'
            className='link link-hover dark:text-primary-content'
          >
            {t('common:allPosts')} &rarr;
          </Link>
        </div>
      )}
    </Layout>
  );
}
