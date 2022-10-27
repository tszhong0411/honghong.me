import { Box, Button, Divider, List, Title } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconArrowRight } from '@tabler/icons'
import { motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { getAllPosts } from '@/lib/mdx'

import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import PostsList from '@/components/PostsList'

import { PostFrontMatter } from './blog'

export const MAX_DISPLAY = 3

export default function Home({ posts }: { posts: Array<PostFrontMatter> }) {
  const { t } = useTranslation('common')
  const { hovered, ref } = useHover<HTMLAnchorElement>()

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
        <Button
          component={Link}
          ref={ref}
          href='/blog'
          rightIcon={
            <motion.div animate={{ x: hovered ? 5 : 0 }}>
              <IconArrowRight size={20} />
            </motion.div>
          }
          noIcon
          underline={false}
        >
          {t('allPosts')}
        </Button>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale).slice(0, MAX_DISPLAY)

  return {
    props: { posts },
  }
}
