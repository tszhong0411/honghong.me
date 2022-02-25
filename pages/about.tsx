import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { InferGetStaticPropsType } from "next";
import { allAuthors } from "contentlayer/generated";

const DEFAULT_LAYOUT = "AuthorLayout";

export const getStaticProps = async ({ locale, defaultLocale }) => {
  const slug = locale !== defaultLocale ? `.${locale}` : "";
  const author = allAuthors.find((p) => p.slug === `default${slug}`);
  return { props: { author } };
};

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <MDXLayoutRenderer layout={author.layout || DEFAULT_LAYOUT} content={author} />;
}
