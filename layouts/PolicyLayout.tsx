import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { ReactNode } from "react";
import { PolicyFrontMatter } from "@/lib/types";

type Props = {
  children: ReactNode;
  frontMatter: PolicyFrontMatter;
  availableLocales: string[];
  locale: string;
};

export default function PolicyLayout({ children, frontMatter, availableLocales, locale }: Props) {
  const { title } = frontMatter;
  return (
    <>
      <PageSEO
        title={`${title} - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {title}
        </h1>
        <div className="prose max-w-full pb-12 dark:prose-dark">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
