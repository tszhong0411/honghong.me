import { getAllFilesFrontMatter } from "@/lib/mdx";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { ComponentProps } from "react";

export const POSTS_PER_PAGE = 10;

export const getStaticProps: GetStaticProps<{
  posts: ComponentProps<typeof ListLayout>["posts"];
  initialDisplayPosts: ComponentProps<typeof ListLayout>["initialDisplayPosts"];
  pagination: ComponentProps<typeof ListLayout>["pagination"];
  locale: string;
  availableLocales: string[];
}> = async ({ locale, defaultLocale, locales }) => {
  const otherLocale = locale !== defaultLocale ? locale : "";
  const posts = await getAllFilesFrontMatter("blog", otherLocale);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
  return {
    props: {
      initialDisplayPosts,
      posts,
      pagination,
      locale,
      availableLocales: locales,
    },
  };
};

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
  locale,
  availableLocales,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {t("common:blogDesc", { count: posts.length })}
        </p>
        <ListLayout
          posts={posts}
          initialDisplayPosts={initialDisplayPosts}
          pagination={pagination}
          title={""}
        />
      </div>
    </>
  );
}
