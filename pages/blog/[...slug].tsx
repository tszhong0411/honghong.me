import fs from "fs";
import PageTitle from "@/components/PageTitle";
import generateRss from "@/lib/generate-rss";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from "@/lib/mdx";
import { AuthorFrontMatter, PostFrontMatter, Toc } from "@/lib/types";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

const DEFAULT_LAYOUT = "PostLayout";

export const getStaticPaths: GetStaticPaths = async ({ locales, defaultLocale }) => {
  const localesPost = locales
    .map((locale) => {
      const otherLocale = locale !== defaultLocale ? locale : "";
      const posts = getFiles("blog", otherLocale);
      return posts.map((post) => [post, locale]);
    })
    .flat();

  return {
    paths: localesPost.map(([p, l]) => ({
      params: {
        slug: formatSlug(p).split("/"),
      },
      locale: l,
    })),
    fallback: false,
  };
};

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  post: { mdxSource: string; toc: Toc; frontMatter: PostFrontMatter };
  authorDetails: AuthorFrontMatter[];
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
  availableLocales?: string;
}> = async ({ defaultLocale, locales, locale, params }) => {
  const slug = (params.slug as string[]).join("/");
  const otherLocale = locale !== defaultLocale ? locale : "";
  const allPosts = await getAllFilesFrontMatter("blog", otherLocale);
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug);
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;
  const post = await getFileBySlug("blog", slug, otherLocale);
  // @ts-ignore
  const authorList = post.frontMatter.authors || ["default"];
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author], otherLocale);
    return authorResults.frontMatter;
  });
  const authorDetails = await Promise.all(authorPromise);

  // rss
  if (allPosts.length > 0) {
    const rss = generateRss(allPosts, locale, defaultLocale);
    fs.writeFileSync(`./public/feed${otherLocale === "" ? "" : `.${otherLocale}`}.xml`, rss);
  }

  // Checking if available in other locale for SEO
  const availableLocales = [];
  await locales.forEach(async (ilocal) => {
    const otherLocale = ilocal !== defaultLocale ? ilocal : "";
    const iAllPosts = await getAllFilesFrontMatter("blog", otherLocale);
    iAllPosts.map((ipost) => {
      if (ipost.slug === post.frontMatter.slug && ipost.slug !== "") availableLocales.push(ilocal);
    });
  });

  return { props: { post, authorDetails, prev, next, availableLocales } };
};

export default function Blog({
  post,
  authorDetails,
  prev,
  next,
  availableLocales,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, toc, frontMatter } = post;

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
          availableLocales={availableLocales}
        />
      ) : (
        <div className="my-24 text-center">
          <PageTitle>
            製作中{" "}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  );
}
