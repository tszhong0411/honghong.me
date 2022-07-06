import { Divider, Title } from '@mantine/core';
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
  const filteredPosts = sortedPosts
    .filter(
      (slug) =>
        slug.slug.split('.')[slug.slug.split('.').length - 1] === locale.locale
    )
    .slice(0, MAX_DISPLAY)
    .map((post) => {
      delete post._raw;

      return post;
    });

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
        <div>
          <Hero />
          <Title order={2}>{t('common:latestPosts')}</Title>
        </div>
        <Divider my='xl' />
        <ul>
          {filteredPosts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug } = post;
            const formattedSlug = slug.replace(`.${locale}`, '');

            return <PostsList key={formattedSlug} post={post} />;
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
