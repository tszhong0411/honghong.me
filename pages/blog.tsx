import { allBlogs } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { GoSearch } from 'react-icons/go'

import { allCoreContent, sortedBlogPost } from '@/lib/utils/contentlayer'
import formatDate from '@/lib/utils/formatDate'

import Container from '@/components/Container'
import Link from '@/components/Link'

export const POSTS_PER_PAGE = 10

export const getStaticProps = async (locale: { locale: string }) => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter(
    (slug) => slug.slug.split('.')[slug.slug.split('.').length - 1] === locale.locale
  )

  return {
    props: {
      filteredPosts,
    },
  }
}

export default function Blog({ filteredPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = filteredPosts?.filter((post) => {
    const searchContent = post.title + post.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const router = useRouter()
  const displayPosts = filteredBlogPosts

  return (
    <Container title="Blog - 小康">
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-6 text-3xl font-bold md:text-5xl">Blog</h1>
        <p className="mb-12">{t('common:blogDesc', { count: filteredPosts?.length })}</p>
        <div className="space-y-2 md:space-y-5">
          <div className="relative">
            <input
              aria-label={t('common:search')}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('common:search')}
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <GoSearch
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              size={20}
            />
          </div>
        </div>
        <ul>
          {!filteredBlogPosts?.length && <p className="p-4">{t('common:noPostsFound')}</p>}
          {displayPosts?.map((post) => {
            const { slug, date, title, summary, image } = post
            const formattedSlug = slug.replace(`.${router.locale}`, '')
            return (
              <li key={formattedSlug} className="py-12">
                <article>
                  <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">{t('common:publishedOn')}</dt>
                      <dd className="mb-4">
                        <time dateTime={date}>{formatDate(date, router.locale)}</time>
                      </dd>
                    </dl>
                    <div className="flex flex-col items-center sm:flex-row xl:col-span-3">
                      <div className="mx-2 my-8 w-full sm:my-0 sm:w-1/3">
                        <Link href={`/blog/${formattedSlug}`}>
                          <div className="overflow-hidden px-8 sm:px-0">
                            <Image
                              src={image}
                              alt="Cover"
                              height={720}
                              width={1280}
                              className="rounded duration-500 hover:scale-110"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="mx-2 w-full sm:w-2/3">
                        <div>
                          <div>
                            <h2 className="text-2xl font-bold">
                              <Link
                                href={`/blog/${formattedSlug}`}
                                data-cy="post-title"
                                className="border-b-2 border-transparent duration-300 hover:border-brand"
                              >
                                {title}
                              </Link>
                            </h2>
                          </div>
                          <div className="mb-8 mt-6 text-typeface-secondary dark:text-typeface-secondary-dark">
                            {summary}
                          </div>
                          <Link
                            href={`/blog/${formattedSlug}`}
                            aria-label={`Read "${title}"`}
                            className="border-b-2 border-transparent duration-300 hover:border-brand"
                          >
                            {t('common:readMore')} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </Container>
  )
}
