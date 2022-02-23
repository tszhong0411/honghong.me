import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { getFileBySlug } from "@/lib/mdx";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Policy } from "@/lib/types";

const DEFAULT_LAYOUT = "PolicyLayout";

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  locale: string;
  defaultLocale: string;
  locales: string[];
  pageInfo: { mdxSource: string; frontMatter: Policy };
  availableLocales: string[];
}> = async ({ locale, defaultLocale, locales }) => {
  const otherLocale = locale !== defaultLocale ? locale : "";
  const pageInfo = await getFileBySlug("privacyPolicy", [`default`], otherLocale);
  return { props: { pageInfo, availableLocales: locales } };
};

export default function About({ pageInfo, availableLocales }) {
  const { mdxSource, frontMatter } = pageInfo;

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      availableLocales={availableLocales}
    />
  );
}
