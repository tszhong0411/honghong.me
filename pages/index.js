import Hero from "@/components/Hero";
import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import formatDate from "@/lib/utils/formatDate";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const MAX_DISPLAY = 3;

export async function getStaticProps({ locale, defaultLocale, locales }) {
    const otherLocale = locale !== defaultLocale ? locale : "";
    const posts = await getAllFilesFrontMatter("blog", otherLocale);

    return { props: { posts, locale, availableLocales: locales } };
}

export default function Home({ posts, locale, availableLocales }) {
    const { t } = useTranslation();

    return (
        <>
            <PageSEO
                title={siteMetadata.title}
                description={siteMetadata.description[locale]}
                availableLocales={availableLocales}
            />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <Hero />
                    <h1 className="text-3xl font-semibold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
                        {t("common:latestPosts")}
                    </h1>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {!posts.length && (
                        <span className="my-8 block text-xl">
                            {t("common:noPostsFound")}
                        </span>
                    )}
                    {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
                        const { slug, date, title, summary, tags, images } =
                            frontMatter;
                        return (
                            <li key={slug} className="py-12">
                                <article>
                                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0">
                                        <dl>
                                            <dt className="sr-only">
                                                Published on
                                            </dt>
                                            <dd className="mb-4 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={date}>
                                                    {formatDate(date, locale)}
                                                </time>
                                            </dd>
                                        </dl>
                                        <div className="flex flex-col items-center sm:flex-row xl:col-span-3">
                                            <div className="mx-2 my-8 w-full sm:my-0 sm:w-1/3">
                                                <Link href={`/blog/${slug}`}>
                                                    <div className="custom-image-container overflow-hidden rounded-[12px]">
                                                        <Image
                                                            src={images}
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
                                                                className="text-gray-900 transition-all hover:text-[#ff4532] 
                                                                dark:text-gray-100 dark:hover:text-[#ff4532]"
                                                            >
                                                                {title}
                                                            </Link>
                                                        </h2>
                                                        <div className="flex flex-wrap">
                                                            {tags.map((tag) => (
                                                                <Tag
                                                                    key={tag}
                                                                    text={tag}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                                        {summary}
                                                    </div>
                                                    <div className="text-base font-medium leading-6">
                                                        <Link
                                                            href={`/blog/${slug}`}
                                                            className="group inline-flex h-9 items-center whitespace-nowrap rounded-full bg-red-100 px-3 text-sm font-medium text-red-700 hover:bg-red-200 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-500"
                                                            aria-label={`Read "${title}"`}
                                                        >
                                                            {t(
                                                                "common:readMore",
                                                            )}{" "}
                                                            &rarr;
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
                        className="font-medium text-[#cb3728] hover:text-[#dc2626] dark:text-[#ff4532] dark:hover:text-primary-400"
                        aria-label="all posts"
                    >
                        {t("common:allPosts")} &rarr;
                    </Link>
                </div>
            )}
        </>
    );
}
