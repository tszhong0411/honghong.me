import { PageSEO } from "@/components/SEO";
import useTranslation from "next-translate/useTranslation";

export default function AuthorLayout({ children, frontMatter, availableLocales }) {
  const { name } = frontMatter;
  const { t } = useTranslation();

  return (
    <>
      <PageSEO
        title={`About - ${name}`}
        description={`${t("SEO:author")} - ${name}`}
        availableLocales={availableLocales}
      />
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
