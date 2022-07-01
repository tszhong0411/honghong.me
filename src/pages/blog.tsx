import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { GoSearch } from 'react-icons/go';

import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer';

import Layout from '@/components/Layout';
import PostsList from '@/components/PostsList';

export const POSTS_PER_PAGE = 10;

export const getStaticProps = async (locale: { locale: string }) => {
  const sortedPosts = sortedBlogPost(allBlogs);
  const posts = allCoreContent(sortedPosts);
  const filteredPosts = posts.filter(
    (slug) =>
      slug.slug.split('.')[slug.slug.split('.').length - 1] === locale.locale
  );

  return {
    props: {
      filteredPosts,
    },
  };
};

export default function Blog({
  filteredPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = React.useState('');
  const filteredBlogPosts = filteredPosts?.filter((post) => {
    const searchContent = post.title + post.summary;
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });
  const router = useRouter();
  const displayPosts = filteredBlogPosts;

  return (
    <Layout templateTitle='Blog'>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold dark:text-primary-content md:text-5xl'>
          Blog
        </h1>
        <p className='mb-12'>
          {t('common:blogDesc', { count: filteredPosts?.length })}
        </p>
        <div className='space-y-2 md:space-y-5'>
          <div className='relative'>
            <input
              aria-label={t('common:search')}
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('common:search')}
              className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            />
            <GoSearch
              className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
              size={20}
            />
          </div>
        </div>
        <ul>
          {!filteredBlogPosts?.length && (
            <p className='p-4'>{t('common:noPostsFound')}</p>
          )}
          {displayPosts?.map((post, index) => {
            const { slug } = post;
            const formattedSlug = slug.replace(`.${router.locale}`, '');
            return (
              <PostsList
                key={formattedSlug}
                post={post}
                divider={index !== displayPosts.length - 1}
              />
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}
