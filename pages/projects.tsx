import siteMetadata from "@/data/siteMetadata";
import projectsData from "@/data/projectsData";
import Card from "@/components/Card";
import { PageSEO } from "@/components/SEO";
import { GetStaticProps } from "next";
import useTranslation from "next-translate/useTranslation";

export const getStaticProps: GetStaticProps = async ({ locale, locales }) => {
  return { props: { locale, availableLocales: locales } };
};

export default function Projects({ locale, availableLocales }) {
  const { t } = useTranslation();

  return (
    <>
      <PageSEO
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {t("projects:title")}
        </h1>
        <p className="mb-12 text-gray-600 dark:text-gray-400">{t("projects:description")}</p>
        <div className="flex flex-wrap">
          {projectsData[locale]?.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              href={d.href}
              imgSrc={d.imgSrc}
            />
          ))}
        </div>
      </div>
    </>
  );
}
