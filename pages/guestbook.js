import prisma from "lib/prisma";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Guestbook from "@/components/Guestbook";

export default function GuestbookPage({ fallbackData }) {
    return (
        <>
            <PageSEO
                title={`Guestbook - ${siteMetadata.author}`}
                description={"小康的留言簿"}
            />
            <div className="mx-auto flex flex-col justify-center">
                <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                    Guestbook
                </h1>
                <p className="mb-12 text-gray-600 dark:text-gray-400">
                    在下方發表評論，有什麼想說的嗎？
                </p>
                <Guestbook fallbackData={fallbackData} />
            </div>
        </>
    );
}

export async function getStaticProps() {
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
        },
        revalidate: 60,
    };
}
