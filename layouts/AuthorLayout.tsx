import { PageSEO } from "@/components/SEO";
import useTranslation from "next-translate/useTranslation";
import { ReactNode } from "react";
import type { Authors } from "contentlayer/generated";

type Props = {
  children: ReactNode;
  content: Omit<Authors, "_id" | "_raw" | "body">;
};

export default function AuthorLayout({ children, content }: Props) {
  const { name } = content;
  const { t } = useTranslation();

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`${t("SEO:author")} - ${name}`} />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          About
        </h1>
        <div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  );
}
