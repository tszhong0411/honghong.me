import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Link from "@/components/Link";
import useTranslation from "next-translate/useTranslation";

export async function getStaticProps({ locale, locales }) {
    return { props: { locale, availableLocales: locales } };
}

export default function ToolLayout({
    children,
    title,
    description,
    locale,
    availableLocales,
}) {
    const { t } = useTranslation();

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
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                <div className="max-w-full py-12">{children}</div>
                <div>
                    <Link
                        href={"/tools"}
                        className="border-b-2 border-transparent text-themeColor-500 duration-300 hover:border-themeColor-500 dark:text-themeColor-350 dark:hover:border-themeColor-350"
                    >
                        ← {t("tools:backTools")}
                    </Link>
                </div>
            </div>
        </>
    );
}
