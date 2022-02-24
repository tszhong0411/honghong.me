import siteMetadata from "@/data/siteMetadata";
import Youtube from "@/components/metrics/Youtube";
import Github from "@/components/metrics/Github";
import BlogTotalViews from "@/components/metrics/BlogTotalViews";
import TopTracks from "@/components/TopTracks";
import { PageSEO } from "@/components/SEO";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <PageSEO
        title={`Dashboard - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Dashboard
        </h1>
        <p className="mb-12 text-gray-600 dark:text-gray-400">{t("dashboard:description")}</p>
        <div className="flex w-full flex-col">
          <Youtube />
          <Github />
          <BlogTotalViews />
        </div>
        <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
          {t("dashboard:spotifyTitle")}
        </h2>
        <TopTracks />
      </div>
    </>
  );
}
