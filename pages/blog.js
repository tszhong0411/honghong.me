import { getAllFilesFrontMatter } from "@/lib/mdx";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { PageSEO } from "@/components/SEO";

export const POSTS_PER_PAGE = 10;

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter("blog");
    const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
    const pagination = {
        currentPage: 1,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    };

    return { props: { initialDisplayPosts, posts, pagination } };
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
    return (
        <>
            <PageSEO
                title={`Blog - ${siteMetadata.author}`}
                description={siteMetadata.description}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    Blog
                </h1>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                    {`我在 2021 年 12 月開始寫 Blog，主要是軟體分享與技術分享。我總共在我的 Blog 上寫了 ${posts.length} 篇文章。你可以在下方搜尋欄以標題過濾。`}
                </p>
                <ListLayout
                    posts={posts}
                    initialDisplayPosts={initialDisplayPosts}
                    pagination={pagination}
                />
            </div>
        </>
    );
}
