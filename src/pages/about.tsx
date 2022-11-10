/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'

import { getContentBySlug } from '@/lib/mdx'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import MDXComponents from '@/components/MDXComponents'
import Typography from '@/components/Typography'

type PageFrontMatter = {
  title: string
  description: string
  slug: string
}

const About = ({ page }) => {
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

export default About
