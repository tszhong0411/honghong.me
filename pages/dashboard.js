import siteMetadata from "@/data/siteMetadata";
import Youtube from "@/components/metrics/Youtube";
import Github from "@/components/metrics/Github";
import BlogTotalViews from "@/components/metrics/BlogTotalViews";
import TopTracks from "@/components/TopTracks";
import { PageSEO } from "@/components/SEO";

export default function Dashboard() {
    return (
        <>
            <PageSEO
                title={`Dashboard - ${siteMetadata.author}`}
                description={
                    "這是我的個人儀表板，使用 Next.js API routes 部署為serverless functions。我用這個儀表板以跟踪跨平台的各種指標，例如YouTube、GitHub 等。"
                }
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    Dashboard
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    這是我的個人儀表板，使用 Next.js API routes 部署為
                    serverless
                    functions。我用這個儀表板以跟踪跨平台的各種指標，例如YouTube、GitHub
                    等。
                </p>
                <div className="flex w-full flex-col">
                    <Youtube />
                    <Github />
                    <BlogTotalViews />
                </div>
                <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
                    熱門曲目
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                    這是我在 Spotify 上每天更新的熱門曲目
                </p>
                <TopTracks />
            </div>
        </>
    );
}
