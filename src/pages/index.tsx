import { Box, Divider, List, Title, useMantineTheme } from '@mantine/core'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import { getAllPosts } from '@/lib/mdx'
import { PostFrontMatter } from '@/lib/types'

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import PostsList from '@/components/PostsList'

export const MAX_DISPLAY = 5

export default function Home({ posts }: { posts: PostFrontMatter[] }) {
  const { t } = useTranslation('common')
  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <Layout>
      <div>
        <div>
          <Hero />
          <Title order={2}>{t('latestPosts')}</Title>
        </div>
        <Divider my='xl' />
        <List listStyleType='none'>
          {posts.map((post) => (
            <PostsList key={post.slug} post={post} />
          ))}
        </List>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link
          href='/blog'
          aria-label='all posts'
          sx={{
            color: dark ? 'white' : 'black',
          }}
        >
          {t('allPosts')} &rarr;
        </Link>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale)

  return {
    props: { posts },
  }
}
