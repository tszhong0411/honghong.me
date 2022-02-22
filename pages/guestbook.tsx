import prisma from "lib/prisma";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Guestbook from "@/components/Guestbook";
import useTranslation from "next-translate/useTranslation";

export default function GuestbookPage({ fallbackData, locale, availableLocales }) {
  const { t } = useTranslation();

  return (
    <>
      <PageSEO
        title={`Guestbook - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Guestbook
        </h1>
        <p className="mb-12 text-gray-600 dark:text-gray-400">{t("guestbook:description")}</p>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </>
  );
}

export async function getStaticProps({ locale, locales }) {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: "desc",
    },
  });

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString(),
  }));

  return {
    props: {
      fallbackData,
      locale,
      availableLocales: locales,
    },
    revalidate: 60,
  };
}
