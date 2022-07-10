import { Input, Text } from '@mantine/core';
import { allBlogs } from 'contentlayer/generated';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { Search } from 'tabler-icons-react';

import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer';

import Layout from '@/components/Layout';
import PageLayout from '@/components/Layout/PageLayout';
import PostsList from '@/components/PostsList';

export const POSTS_PER_PAGE = 10;

export const getServerSideProps = async (locale: { locale: string }) => {
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

export default function Blog({ filteredPosts }) {
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
      <PageLayout
        title='Blog'
        description={t('common:blogDesc', { count: filteredPosts?.length })}
      >
        <Input
          icon={<Search size={15} />}
          placeholder={t('common:search')}
          type='text'
          radius='md'
          aria-label={t('common:search')}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ul>
          {!filteredBlogPosts?.length && (
            <Text sx={{ textAlign: 'center' }} py={48}>
              {t('common:noPostsFound')}
            </Text>
          )}
          {displayPosts?.map((post) => {
            const { slug } = post;
            const formattedSlug = slug.replace(`.${router.locale}`, '');
            return <PostsList key={formattedSlug} post={post} />;
          })}
        </ul>
      </PageLayout>
    </Layout>
  );
}
