import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Link from "@/components/Link";

export default function ToolLayout({ children, title }) {
    return (
        <>
            <PageSEO
                title={`${title} - ${siteMetadata.author}`}
                description={siteMetadata.description}
            />
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        {title}
                    </h1>
                </div>
                <div className="max-w-full py-12">{children}</div>
            </div>
            <div className="prose">
                <Link href={"/tools"}>← 回到工具</Link>
            </div>
        </>
    );
}
