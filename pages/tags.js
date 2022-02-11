import Link from "@/components/Link";
import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { getAllTags } from "@/lib/tags";
import kebabCase from "@/lib/utils/kebabCase";

export async function getStaticProps() {
    const tags = await getAllTags("blog");

    return { props: { tags } };
}

export default function Tags({ tags }) {
    const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
    return (
        <>
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    Tags
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    關於我的 Blog 的 Tags
                </p>
                <div className="flex max-w-lg flex-wrap pb-12">
                    {Object.keys(tags).length === 0 && "No tags found."}
                    {sortedTags.map((t) => {
                        return (
                            <div key={t} className="mt-2 mb-2 mr-5">
                                <Tag text={t} />
                                <Link
                                    href={`/tags/${kebabCase(t)}`}
                                    className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                                >
                                    {` (${tags[t]})`}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
