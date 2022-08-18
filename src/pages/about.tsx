/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'

import { getContentBySlug } from '@/lib/mdx'
import { PageFrontMatter } from '@/lib/types'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import MDXComponents from '@/components/MDXComponents'
import Typography from '@/components/Typography'

export default function About({ page }) {
  const { title, description } = page.frontMatter as PageFrontMatter

  return (
    <Layout title={title} description={description}>
      <PageLayout title={title} description={description}>
        <Typography>
          <MDXRemote
            {...page.source}
            components={
              {
                ...MDXComponents,
              } as any
            }
          />
        </Typography>
      </PageLayout>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const page = await getContentBySlug('page', 'about' as string, locale)

  return {
    props: { page },
  }
}
