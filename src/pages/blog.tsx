import { Input, List, Text } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { getAllPosts } from '@/lib/mdx'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import PostsList from '@/components/PostsList'

export type PostFrontMatter = {
  title: string
  date: string
  modifiedTime: string
  summary: string
  image: string
  slug: string
  views?: string
}

const Blog = ({ posts }: { posts: PostFrontMatter[] }) => {
  const { t } = useTranslation('common')
  const [searchValue, setSearchValue] = React.useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Layout title='Blog'>
      <PageLayout
        title='Blog'
        description={t('blogDesc', { count: posts.length })}
      >
        <Input
          icon={<IconSearch size={15} />}
          placeholder={t('search')}
          type='text'
          radius='md'
          aria-label={t('search')}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <List listStyleType='none'>
          {!filteredPosts.length && (
            <Text sx={{ textAlign: 'center' }} py={48}>
              {t('noPostsFound')}
            </Text>
          )}
          {filteredPosts.map((post) => (
            <PostsList key={post.slug} post={post} />
          ))}
        </List>
      </PageLayout>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale)

  return {
    props: { posts },
  }
}

export default Blog
