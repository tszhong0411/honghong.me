import Link from '@/components/Link'
import { useState } from 'react'
import formatDate from '@/lib/utils/formatDate'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import type { Blog } from 'contentlayer/generated'
import { CoreContent } from '@/lib/utils/contentlayer'

interface Props {
  posts: CoreContent<Blog>[]
  title: string
}

export default function ListLayout({ posts, title }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts?.filter((post) => {
    const searchContent = post.title + post.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts = filteredBlogPosts

  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <>
      <div className="space-y-2 md:space-y-5">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {title}
        </h1>
        <div className="relative">
          <input
            aria-label={t('common:search')}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('common:search')}
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      <ul>
        {!filteredBlogPosts?.length && <p className="p-4">{t('common:noPostsFound')}</p>}
        {displayPosts?.map((post) => {
          const { slug, date, title, summary, images } = post
          const formattedSlug = slug.split('/')[slug.split('/').length - 1]
          return (
            <li key={formattedSlug} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0">
                  <dl>
                    <dt className="sr-only">{t('common:publishedOn')}</dt>
                    <dd className="mb-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>{formatDate(date, locale)}</time>
                    </dd>
                  </dl>
                  <div className="flex flex-col items-center sm:flex-row xl:col-span-3">
                    <div className="mx-2 my-8 w-full sm:my-0 sm:w-1/3">
                      <Link href={`/blog/${formattedSlug}`}>
                        <div className="custom-image-container overflow-hidden rounded-[12px]">
                          <Image
                            src={images[0]}
                            alt="Cover"
                            layout="fill"
                            className="custom-image duration-500 hover:scale-[1.1]"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="mx-2 w-full sm:w-2/3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${formattedSlug}`}
                              className="text-gray-900 duration-300 hover:text-themeColor-500 dark:text-gray-50 dark:hover:text-themeColor-350"
                            >
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${formattedSlug}`}
                            className="group inline-flex h-9 items-center whitespace-nowrap rounded-full bg-red-100 px-3 text-sm font-medium text-red-700 duration-300 hover:bg-red-200 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-500"
                            aria-label={`Read "${title}"`}
                          >
                            {t('common:readMore')} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </>
  )
}
