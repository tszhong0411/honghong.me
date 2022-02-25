import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import useTranslation from 'next-translate/useTranslation'
import { InferGetStaticPropsType } from 'next'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { useRouter } from 'next/router'

export const POSTS_PER_PAGE = 10

export const getStaticProps = async (locale) => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter((slug) => slug.slug.split('/')[0] === locale.locale)

  return {
    props: {
      filteredPosts,
    },
  }
}

export default function Blog({ filteredPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {t('common:blogDesc', { count: filteredPosts?.length })}
        </p>
        <ListLayout posts={filteredPosts} title={''} />
      </div>
    </>
  )
}
