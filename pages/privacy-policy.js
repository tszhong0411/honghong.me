import { MDXLayoutRenderer } from "@/components/MDXComponents";
import { getFileBySlug } from "@/lib/mdx";

const DEFAULT_LAYOUT = "PolicyLayout";

export async function getStaticProps({ locale, defaultLocale, locales }) {
    const otherLocale = locale !== defaultLocale ? locale : "";
    const pageInfo = await getFileBySlug(
        "privacyPolicy",
        [`default`],
        otherLocale,
    );
    return { props: { pageInfo, availableLocales: locales } };
}

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
