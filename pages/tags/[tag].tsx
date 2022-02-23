import fs from "fs";
import path from "path";
import { TagSEO } from "@/components/SEO";
import siteMetadata, { locale } from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import generateRss from "@/lib/generate-rss";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/utils/kebabCase";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import { PostFrontMatter } from "@/lib/types";

const root = process.cwd();

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const tags = await Promise.all(
    locales.map(async (locale) => {
      const otherLocale = locale !== defaultLocale ? locale : "";
      const tags = await getAllTags("blog", otherLocale);
      return Object.entries(tags).map((k) => [k[0], locale]);
    }),
  );

  return {
    paths: tags.flat().map(([tag, locale]) => ({
      params: {
        tag,
      },
      locale,
    })),
    fallback: false,
  };
};

//@ts-ignore
export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[];
  tag: string;
  locale: string;
  availableLocales: string[];
}> = async ({ params, defaultLocale, locale, locales }) => {
  const tag = params.tag as string;
  const otherLocale = locale !== defaultLocale ? locale : "";
  const allPosts = await getAllFilesFrontMatter("blog", otherLocale);
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag),
  );
  const page = `tags/${tag}/feed.xml`;
  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, locale, defaultLocale, page);
    const rssPath = path.join(root, "public", "tags", tag);
    fs.mkdirSync(rssPath, { recursive: true });
    fs.writeFileSync(
      path.join(rssPath, `feed${otherLocale === "" ? "" : `.${otherLocale}`}.xml`),
      rss,
    );
  }

  // Checking if available in other locale for SEO
  const availableLocales = [];
  await locales.forEach(async (ilocal) => {
    const otherLocale = ilocal !== defaultLocale ? ilocal : "";
    const itags = await getAllTags("blog", otherLocale);
    Object.entries(itags).map((itag) => {
      if (itag[0] === params.tag) availableLocales.push(ilocal);
    });
  });

  return {
    props: {
      posts: filteredPosts,
      tag: params.tag,
      locale,
      availableLocales,
    },
  };
};

export default function Tag({
  posts,
  tag,
  locale,
  availableLocales,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = tag[0].toUpperCase() + tag.split(" ").join("-").slice(1);
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
        availableLocales={availableLocales}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
}
