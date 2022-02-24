import Hero from "@/components/Hero";
import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import formatDate from "@/lib/utils/formatDate";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { InferGetStaticPropsType } from "next";
import { sortedBlogPost, allCoreContent } from "@/lib/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import { useRouter } from "next/router";

const MAX_DISPLAY = 3;

export const getStaticProps = async () => {
  // TODO: move computation to get only the essential frontmatter to contentlayer.config
  const sortedPosts = sortedBlogPost(allBlogs);
  const posts = allCoreContent(sortedPosts);

  return { props: { posts } };
};

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description[locale]} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <Hero />
          <h1 className="text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
            {t("common:latestPosts")}
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && <span className="my-8 block text-xl">{t("common:noPostsFound")}</span>}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="mb-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, locale)}</time>
                      </dd>
                    </dl>
                    <div className="flex flex-col items-center sm:flex-row xl:col-span-3">
                      <div className="mx-2 my-8 w-full sm:my-0 sm:w-1/3">
                        <Link href={`/blog/${slug}`}>
                          <div className="custom-image-container overflow-hidden rounded-[12px] px-8 sm:px-0">
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
                                href={`/blog/${slug}`}
                                className="text-gray-900 duration-300 hover:text-themeColor-500 dark:text-gray-50 dark:hover:text-themeColor-350"
                                data-cy="post-title"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                          <div className="text-base font-medium leading-6">
                            <Link
                              href={`/blog/${slug}`}
                              className="group inline-flex h-9 items-center whitespace-nowrap rounded-full bg-red-100 px-3 text-sm font-medium text-red-700 duration-300 hover:bg-red-200 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-500"
                              aria-label={`Read "${title}"`}
                            >
                              {t("common:readMore")} &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="border-b-2 border-transparent font-medium text-themeColor-500 duration-300 hover:border-themeColor-500 dark:text-themeColor-350 dark:hover:border-themeColor-350"
            aria-label="all posts"
          >
            {t("common:allPosts")} &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
