import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { getFileBySlug } from "@/lib/mdx";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { AuthorFrontMatter } from "@/lib/types";

const DEFAULT_LAYOUT = "AuthorLayout";

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  authorDetails: { mdxSource: string; frontMatter: AuthorFrontMatter };
  availableLocales: string[];
}> = async ({ locale, defaultLocale, locales }) => {
  const otherLocale = locale !== defaultLocale ? locale : "";
  const authorDetails = await getFileBySlug("authors", [`default`], otherLocale);
  return { props: { authorDetails, availableLocales: locales } };
};

export default function About({
  authorDetails,
  availableLocales,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = authorDetails;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      availableLocales={availableLocales}
    />
  );
}
