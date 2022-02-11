import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Link from "@/components/Link";

export default function ToolLayout({ children, title, description }) {
    return (
        <>
            <PageSEO
                title={`${title} - ${siteMetadata.author}`}
                description={`小康製作的${title}`}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    {title}
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
                <div className="max-w-full py-12">{children}</div>
                <div className="prose">
                    <Link href={"/tools"}>← 回到工具</Link>
                </div>
            </div>
        </>
    );
}
