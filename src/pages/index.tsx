import { Box, Divider, Title, useMantineTheme } from '@mantine/core';
import { allBlogs } from 'contentlayer/generated';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { sortedBlogPost } from '@/lib/utils/contentlayer';

import Hero from '@/components/Hero';
import Layout from '@/components/Layout';
import Link from '@/components/Link';
import PostsList from '@/components/PostsList/PostsList';

export const MAX_DISPLAY = 5;

export default function Home({ filteredPosts }) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { colorScheme } = useMantineTheme();
  const dark = colorScheme === 'dark';

  return (
    <Layout>
      <div>
        <div>
          <Hero />
          <Title order={2}>{t('common:latestPosts')}</Title>
        </div>
        <Divider my='xl' />
        <ul style={{ listStyle: 'none' }}>
          {filteredPosts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug } = post;
            const formattedSlug = slug.replace(`.${locale}`, '');

            return <PostsList key={formattedSlug} post={post} />;
          })}
        </ul>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          href='/blog'
          aria-label='all posts'
          sx={{
            color: dark ? 'white' : 'black',
          }}
        >
          {t('common:allPosts')} &rarr;
        </Link>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = async (locale: { locale: string }) => {
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
